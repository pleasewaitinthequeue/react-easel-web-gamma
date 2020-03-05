//Update Google Map based on Geolocation with React
//https://stackoverflow.com/questions/50780417/update-google-map-based-on-geolocation-with-react

import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import MapComponent from './MapComponent'

class MapView extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      isMarkerShown: false
    }
  }

  componentWillUpdate(){
    this.getGeoLocation();
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getGeoLocation();
      this.setState({ isMarkerShown: true });
    }, 5000);
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.coords);
                this.setState(prevState => ({
                    currentLatLng: {
                        ...prevState.currentLatLng,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }));
            }
        );
    }
  }

  render() {
    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        currentLocation={this.state.currentLatLng}
      />
    )
  }
}

export default MapView;
