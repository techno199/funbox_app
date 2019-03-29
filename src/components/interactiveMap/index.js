/*global google*/
import React, { Component } from 'react'
import { withStyles, Grid, withTheme } from '@material-ui/core'
import { SearchBar }  from '../searchBar';
import { PointList }  from '../pointList';
import { Map } from '../map';
import { getNextId } from '../db';

const styles = theme => ({
  mapWrapper: {
    display: 'flex'
  }
});

const SEARCH_DEBOUNCE_TIME = 300

export class InteractiveMapUnstyled extends Component {
  state = {
    searchBarValue: '',
    selectedLocations: [],
    predictions: [],
    apiURLKey: process.env.REACT_APP_API_KEY,
    map: null,
    google: null,
    center: {
      lat: 59.95,
      lng: 30.33
    },
    isFetching: false
  }
  debounce = undefined

  handleAddLocation = () => {
    this._addLocation(this.state.searchBarValue)
    this._clearSearchBarValue()
  }

  /**
   * Retrieves details of location and adds it to list of selected locations.
   * Sets current map center to newly obtained
   */
  _addLocation = location => {
    let geocoderService= new google.maps.Geocoder()
    let options = {
      placeId: location.place_id
    }

    geocoderService.geocode(options, details => {
      if (!details.length > 0) return
      else {
        details = details[0]
        this.setState(oldState => {
          let selectedLocations = oldState.selectedLocations.slice()
          let lat = details.geometry.location.lat()
          let lng = details.geometry.location.lng()
          selectedLocations.push({
            id: getNextId(),
            value: location.description,
            lat,
            lng
          })
          return {
            selectedLocations,
            center: {
              lat,
              lng
            }
          }
        })
      } 
    })
    
  }

  _clearSearchBarValue = () => {
    this.setState({searchBarValue: ''})
  }

  _clearSuggestions = () => {
    this.setState({predictions: []})
  }

  handleSearchBoxChange = event => {
    let input = event.target.value

    this.setState({
      searchBarValue: input
    })
    // Clear predictions list if no input provided
    // Indicate that predictions are fetching otherwise
    if (!input.trim()) {
      clearTimeout(this.debounce)
      this.setState({ predictions: [], isFetching: false })
      return
    }
    else {
      this.setState({
        isFetching: true
      })
    }
    // Search for predictions after delay between keystrokes
    this.debounce = setTimeout(() => {
      // Search for predictions on valid user input
      let options = {
        input: input.trim(),
        bounds: this.state.map.getBounds()
      }
  
      let autocompleteService = new google.maps.places.AutocompleteService()
  
      autocompleteService.getPlacePredictions(options, (predictions => {
        this.setState({
            predictions: predictions || [],
            isFetching: false
        });
      }))
    }, SEARCH_DEBOUNCE_TIME)    
  }

  handleRemoveClick = id => () => {
    this.setState(oldState => {
      let selectedLocations = oldState.selectedLocations.filter(item => item.id !== id)
      return {
        selectedLocations
      }
    })
  }

  moveListItem = (dragIndex, hoverIndex) => {
    this.setState(oldState => {
      let locations = oldState.selectedLocations.slice()
      let dragItem = locations[dragIndex]
      locations[dragIndex] = locations[hoverIndex]
      locations[hoverIndex] = dragItem
      return {
        selectedLocations: locations
      }
    })
  }

  onMapLoad = map => {
    this.setState({ map })
  }

  handleSuggestionClick = item => {
    this._addLocation(item)
    this._clearSearchBarValue()
    this._clearSuggestions()
  }

  handlePositionChanged = (location, newLatLng) => {
    // https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
    let geocoder = new google.maps.Geocoder()
    let options = {
      location: newLatLng
    }
    geocoder.geocode(options, (res, status) => {
      this.setState(oldState => {
        let selectedLocations = oldState.selectedLocations.slice()
        if (status === 'OK') {
          location.lat = newLatLng.lat
          location.lng = newLatLng.lng 
          location.value = res[0].formatted_address
        }
        else {
          alert('google doesn\'t know where it is :(')
        }
        return {
          selectedLocations
        }
      })
    })
  }

  render() {
    const { classes, theme } = this.props
    const { searchBarValue, selectedLocations, apiURLKey, predictions, center, isFetching } = this.state

    return (
      <Grid container justify='center' spacing={theme.spacing.unit * 2}>
        <Grid item xs={6}>
          <Grid container direction='column' spacing={theme.spacing.unit * 2}>
            <Grid item>
              <SearchBar 
                value={searchBarValue} 
                onChange={this.handleSearchBoxChange} 
                items={predictions}
                onSuggestionClick={this.handleSuggestionClick}
                isFetching={isFetching}
              />
            </Grid>
            <Grid item>
              <PointList items={selectedLocations} onRemoveClick={this.handleRemoveClick} moveListItem={this.moveListItem}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} className={classes.mapWrapper}>
          <Map 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiURLKey}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{height: '100%'}} />}
            containerElement={<div style={{height: '400px', width: '100%'}} />}
            mapElement={<div style={{height: '100%'}} />}
            onMapLoad={this.onMapLoad}
            selectedLocations={selectedLocations}
            onPositionChanged={this.handlePositionChanged}
            center={center}
          />
        </Grid>
      </Grid>
    )
  }
}

const InteractiveMap = withTheme()(withStyles(styles)(InteractiveMapUnstyled))

export { InteractiveMap }
