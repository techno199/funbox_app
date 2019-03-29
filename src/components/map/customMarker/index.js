import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import { Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types'  

const styles = theme => {

}

class CustomMarkerUnstyled extends Component {
  state = {
    isBaloonOpened: false
  }

  handleMarkerClick = event => {
    this.setState({
      isBaloonOpened: true
    })
  }

  handleBaloonClick = event => {
    this.setState({
      isBaloonOpened: false
    })
  }

  render() {
    const { position, text } = this.props
    const { isBaloonOpened } = this.state
    return (
      <div>
        <Marker position={position} onClick={this.handleMarkerClick} {...this.props}>
        </Marker>
        {
          isBaloonOpened &&
          <InfoWindow position={position} onCloseClick={this.handleBaloonClick}>
            <div>
              {text}
            </div>
          </InfoWindow>
        }
      </div>
    )
  }
}

const CustomMarker = withStyles(styles)(CustomMarkerUnstyled)

CustomMarker.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  text: PropTypes.string
}

export { CustomMarker }
