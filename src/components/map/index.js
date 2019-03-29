import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { GoogleMap, withGoogleMap, withScriptjs, Polyline  } from 'react-google-maps'
import { CustomMarker } from './customMarker';
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

export class MapUnstyled extends Component {
  map = null
  state = {
    zoom: 11
  }

  handlePositionChanged = location => event => {
    let newLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    this.props.onPositionChanged &&
    this.props.onPositionChanged(location, newLatLng)
  }

  render() {
    const { zoom } = this.state
    const { onMapLoad, selectedLocations, center } = this.props
    let path = selectedLocations.map(location => ({
      lat: location.lat,
      lng: location.lng
    }))
    return (
      <GoogleMap
        ref={onMapLoad}
        center={center}
        defaultZoom={zoom}
      >
        {
          selectedLocations.map((location, i) => (
            <CustomMarker key={i}
              position={{ lat: location.lat, lng: location.lng }} 
              text={location.value}  
              onDragEnd={this.handlePositionChanged(location)} 
              draggable={true}/>
          ))
        }
        <Polyline path={path} />
      </GoogleMap>
    )
  }
}

const Map = withStyles(styles)(withScriptjs(withGoogleMap(props => <MapUnstyled  {...props}/>)))

Map.propTypes = {
  onMapLoad: PropTypes.func,
  selectedLocations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }),),
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
}

export { Map }
