import React, { Component } from 'react';
//import Theme from './../../data/Theme';
//import Slider from './../common/Slider';
//import MapView from './../common/MapView';
//import Map from './../common/GoogleMapReact';
//import Map from './../Maps/ReactMapGL';
import Notifications from './Notifications';

class NotificationManager extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <Notifications />
    );
  }
}

export default NotificationManager;
