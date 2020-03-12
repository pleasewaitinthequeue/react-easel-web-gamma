import React, { Component } from 'react';
import Theme from './../../data/Theme';
//import Slider from './../common/Slider';
//import MapView from './../common/MapView';
//import Map from './../common/GoogleMapReact';
//import Map from './../Maps/ReactMapGL';
import Notifications from './Notifications';

class NotificationManager extends Component{
  constructor(props){
    super(props);
    this.state = {
      //latitude: 39.768498365633114,
      //longitude: -86.15802974992113,
      //zoom: 15,
      //radius: 10,
    }
  }

  //onStateChange = (latitude, longitude, zoom) => {
    //this.setState({latitude, longitude, zoom});
  //}

  render(){
    {/*
    return(
      <div>
        <h1>Notification Manager</h1>
        <div style={styles.mapContainerStyle}>
          <Map
            onStateChange={this.onStateChange}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            zoom={this.state.zoom}
            radius={this.state.radius}
          />
        </div>
      </div>
    );
    */}
    return(
      <Notifications />
    );
  }
}

const styles = {
  mapContainerStyle:{
    border:`1px solid ${Theme.colors.darkBlue}`,
    padding: '5px',
    boxShadow:`2px 2px ${Theme.colors.darkBlue}`,
    borderRadius: '2px',
  }
};

export default NotificationManager;
