import React, {Component} from 'react';
import ReactMapGL, { SVGOverlay } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import Theme from './../../data/Theme';
import Credentials from './../../data/Maps';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import {MdContentCopy} from "react-icons/md";

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 'loading',
      viewport: {
        width: this.props.width,
        height: this.props.height,
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        zoom: this.props.zoom,
      },
      radius: this.props.radius,
      coordinates: false,
    }
  }

  onChange = (viewport) => {
    this.setState({viewport});
    this.props.onStateChange(
        this.state.viewport.latitude,
        this.state.viewport.longitude,
        this.state.viewport.zoom,
      );
  }

  redraw = ({project}) => {
    const [cx, cy] = project([this.state.viewport.longitude, this.state.viewport.latitude]);
    return (
      <circle cx={cx} cy={cy} r={this.state.radius} fill={Theme.colors.darkBlue}/>
    );
  }

  mapRef = React.createRef();

  handleViewportChange = (viewport) => {
    this.setState({ viewport: {...this.state.viewport, ...viewport}
    });
  }

  handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = {transitionDuration: 1000};

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  }

  changeRadio = () => {
    this.setState({
      address: !this.state.address,
      coordinates: !this.state.coordinates,
    });
  }

  handleCopy = () => {
    const textField = document.createElement('textarea');
    textField.innerText = `${this.state.viewport.latitude}, ${this.state.viewport.longitude}`;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }

  render() {
    return(
      <ReactMapGL
        ref={this.mapRef}
        {...this.state.viewport}
        mapboxApiAccessToken={Credentials.MapBoxToken}
        onViewportChange={this.onChange}
      >
        <SVGOverlay redraw={this.redraw} />
        <div style={styles.switchStyle}>
          <label>
            Address{'  '}
            <input name="address" type="radio" value="true" checked={!this.state.coordinates} onChange={this.changeRadio}/>
          </label>
          {'  '}
          <label>
            Coordinates{'  '}
            <input name="coordinates" type="radio" value="true" checked={this.state.coordinates} onChange={this.changeRadio}/>
          </label>
        </div>
        <div style={styles.coordStyle}>
          <div style={styles.elementStyle}>
            Latitude, Longitude:
          </div>
          {'  '}
          <div
            style={styles.elementStyle}
          >
            {this.state.viewport.latitude.toFixed(10)},{'  '}{this.state.viewport.longitude.toFixed(10)}
          </div>
          {'  '}
          <div
            style={this.state.copyHover ? styles.elementStyleHover : styles.elementStyle}
            onMouseEnter={() => this.setState({copyHover: true})}
            onMouseLeave={() => this.setState({copyHover: false})}
          >
            <MdContentCopy onClick={this.handleCopy}/>
          </div>
        </div>
        <Geocoder
          mapRef={this.mapRef}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={Credentials.MapBoxToken}
          reverseGeocode={this.state.coordinates}
        />
      </ReactMapGL>
    );
  }
}

const styles = {
  switchStyle:{
    position:"absolute",
    top: 5,
    left: 5,
    borderRadius: 5,
    margin: 5,
    padding: 5,
    backgroundColor:"white",
    color:Theme.colors.darkBlue,
  },
  coordStyle:{
    display:"flex",
    flexDirection:"row",
    position:"absolute",
    bottom: 10,
    right: 5,
    borderRadius: 5,
    margin: 5,
    padding: 5,
    backgroundColor:"white",
    color:Theme.colors.darkBlue,
  },
  elementStyle:{
    backgroundColor:"white",
    color:Theme.colors.darkBlue,
  },
  elementStyleHover:{
    backgroundColor:Theme.colors.darkBlue,
    color:"white",
  }
}

export default Map;
