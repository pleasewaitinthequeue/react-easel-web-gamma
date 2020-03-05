import React, { Component } from 'react';
import MapKey from '../../data/Maps';
import GoogleMapReact from 'google-maps-react';

const defaultProps = {
  center: {lat: 40.73, lng: -73.93},
  zoom: 12,
}

class MapComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      center: this.props.center,

    }
  }

  render(){
    return(
      <div>
        <GoogleMapReact
          bootStrapURLKeys={{
            key: MapKey.credential,
            language: 'en',
          }}
          defaultCenter={this.props.center}
          center={this.state.center}
          defaultZoom={this.props.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        />
      </div>
    );
  }
}

export default MapComponent;
