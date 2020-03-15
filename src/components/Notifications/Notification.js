import React, { Component } from 'react';
import Theme from './../../data/Theme';
import Map from './../Maps/ReactMapGL';
import { MdMap, MdAccessAlarm } from 'react-icons/md';

class Notification extends Component{
  constructor(props){
    super(props);
    this.state = {
      notificationId: this.props.notificationId,
      sender: this.props.sender,
      recipients: this.props.recipients,
      startdate:this.props.startdate,
      duration:this.props.duration,
      type:this.props.type,
    }
  }

  render(){
    switch(this.state.type){
      case 'time':
        return(
          <div style={styles.cardStyle}>
            <h3>{this.state.sender}</h3>
            <p>{this.state.startdate}</p>
            <div style={styles.iconStyle}>
              <MdAccessAlarm size='2em'/>
            </div>
          </div>
        );
      case 'space':
        return(
          <div style={styles.cardStyle}>
            <h3>{this.state.sender}</h3>
            <p>{this.state.startdate}</p>
            <div style={styles.iconStyle}>
              <MdMap size='2em' />
            </div>
          </div>
        );
    }
  }
}

const styles = {
  cardStyle:{
      position:'relative',
      height:'150px',
      width:'300px',
      border:`1px solid ${Theme.colors.darkBlue}`,
      display:'flex',
      flexDirection:'column',
      margin:'5px',
      padding:'5px',
      borderRadius:'2px',
      boxShadow:`2px 2px ${Theme.colors.darkBlue}`,
      color: `${Theme.colors.darkBlue}`,
  },
  iconStyle:{
    position:'absolute',
    height:'2em',
    width:'2em',
    bottom: '5px',
    right: '5px',
    color: `${Theme.colors.darkBlue}`,
  }
}

export default Notification;
