import React, { Component } from 'react';
import Theme from './../../data/Theme';
import fire from '../../data/Fire';
import ChipLister from '../common/ChipLister';
import Notification from './Notification';
import { MdAddCircle } from 'react-icons/md';
import DateTimePicker from 'react-datetime-picker';
import Map from './../Maps/ReactMapGL';

class Notifications extends Component{
  constructor(props){
    super(props);
    this.state = {
      mode: 'loading',
      sender: fire.auth().currentUser.email,
      notifications: null,
      recipients: [],
      latitude: 39.768498365633114,
      longitude: -86.15802974992113,
      startdate: new Date(),
      zoom: 15,
      radius: 10,
      height: '60vh',
      width: '90vw',
      type: 'time',
    }
  }

  onStateChange = (latitude, longitude, zoom) => {
    this.setState({latitude, longitude, zoom});
  }

  renderAddButton = () => {
      return(
          <div
            style={this.state.addButtonMode ? styles.addButtonStyleHover : styles.addButtonStyle}
            onClick={this.addMode.bind(this)}
            onMouseOver={()=>this.setState({addButtonMode:true})}
            onMouseLeave={()=>this.setState({addButtonMode:false})}
          >
              <MdAddCircle/>
              <p>Add Notification</p>
          </div>
      );
  }

  addMode = () => {
      this.setState({
          mode:'adding',
      });
  }

  createNotification = (e) => {
    e.preventDefault();
    let notificationRef = fire.database().ref(`/notifications/`);
    let notification = {
      sender:this.state.sender,
      recipients:this.state.recipients,
      latitude:this.state.latitude,
      longitude:this.state.longitude,
      radius:this.state.radius,
      zoom:this.state.zoom,
      startdate:this.state.startdate.toString(),
      duration:this.state.duration,
      type:this.state.type,
    };

    notificationRef.push(notification).then(()=>{
        this.getNotificationList();
    }).catch((error)=>{
        console.log(`error:  ${error}`);
    });
  }

  notificationMembership = (sender, recipients) => {
    let email = fire.auth().currentUser.email;
    if(email === sender){
      return true;
    } else if(recipients.includes(email)){
      return true;
    } else {
      return false;
    }
  }

  getNotificationList = () => {
      console.log(this.state);
      let notificationList = [];
      let notificationRef = fire.database().ref(`/notifications/`);
      notificationRef.once('value', (snapshot) =>{
          console.log(snapshot);
          snapshot.forEach((child) =>{
              if(this.notificationMembership(child.val().sender, child.val().recipients)){
                notificationList.push({
                    notificationId:child.key,
                    sender:child.val().sender,
                    recipients:child.val().recipients,
                    latitude:child.val().latitude,
                    longitude:child.val().longitude,
                    radius:child.val().radius,
                    zoom:child.val().zoom,
                    startdate:child.val().startdate,
                    duration:child.val().duration,
                    type:child.val().type,
                });
              }
            });
          this.setState({
            notifications: notificationList,
            mode: notificationList.length === 0 ? 'empty' : 'full',
          });
      }).catch((error)=>{
          console.log(`error: ${error}`);
      });
  }

  handleChipListStateChange = ( name, payload ) => {
      console.log(`${name}:  ${JSON.stringify(payload)}`);
      switch(name){
          case 'recipients':
              this.setState({
                  recipients:payload,
              });
              break;
          default:
              break;
      }
  }

  onChange = (date) => {
    console.log(date);
    this.setState({ startdate: date });
    console.log(this.state.startdate);
  }

  notificationForm = () => {
    switch(this.state.type){
      case 'space':
        return(
          <div style={styles.formStyle}>
              <form onSubmit={this.createNotification} style={styles.formStyle}>
                  <div style={styles.formSectionStyle}>
                    <div>
                      <label>
                          Sender:{'  '}
                          <input
                              name="owner"
                              style={styles.formInputStyle}
                              type="text"
                              placeholder="user@example.com"
                              onInput={this.handleChange}
                              value={this.state.sender}
                          />
                      </label>
                    </div>
                    <div>
                      <label>
                        Recipients({this.state.recipients == null ? 0 : this.state.recipients.length}):{'  '}
                        <div style={styles.chipContainerStyle}>
                        <ChipLister
                            divStyle={styles.chipDivStyle}
                            inputStyle={styles.chipInputStyle}
                            handleChipListStateChange={this.handleChipListStateChange}
                            emails={this.state.recipients}
                            name="recipients"
                        />
                        </div>
                      </label>
                    </div>
                    <div>
                      <label>
                        Date/Time:{'  '}
                        <DateTimePicker
                          onChange={this.onChange}
                          value={this.state.startdate}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                          Notify in Advance:{'  '}
                          <input
                              name="duration"
                              //style={styles.formInputStyle}
                              type="number"
                              placeholder="0"
                              onInput={this.handleChange}
                              value={this.state.duration}
                          />
                      </label>
                    </div>
                  </div>
                  <div>
                    <Map
                      onStateChange={this.onStateChange}
                      latitude={this.state.latitude}
                      longitude={this.state.longitude}
                      zoom={this.state.zoom}
                      radius={this.state.radius}
                      height={this.state.height}
                      width={this.state.width}
                    />
                  </div>
                    <div>
                        <input
                            style={styles.chipInputStyle}
                            type="submit"
                        />
                    </div>
                  </form>
                </div>
      );
    case 'time':
      return(
        <div style={styles.formStyle}>
            <form onSubmit={this.createNotification} style={styles.formStyle}>
                <div style={styles.formSectionStyle}>
                  <div>
                    <label>
                        Sender:{'  '}
                        <input
                            name="owner"
                            style={styles.formInputStyle}
                            type="text"
                            placeholder="user@example.com"
                            onInput={this.handleChange}
                            value={this.state.sender}
                        />
                    </label>
                  </div>
                  <div>
                    <label>
                      Recipients({this.state.recipients == null ? 0 : this.state.recipients.length}):{'  '}
                      <div style={styles.chipContainerStyle}>
                      <ChipLister
                          divStyle={styles.chipDivStyle}
                          inputStyle={styles.chipInputStyle}
                          handleChipListStateChange={this.handleChipListStateChange}
                          emails={this.state.recipients}
                          name="recipients"
                      />
                      </div>
                    </label>
                  </div>
                  <div>
                    <label>
                      Date/Time:{'  '}
                      <DateTimePicker
                        onChange={this.onChange}
                        value={this.state.startdate}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                        Duration:{'  '}
                        <input
                            name="duration"
                            //style={styles.formInputStyle}
                            type="number"
                            placeholder="0"
                            onInput={this.handleChange}
                            value={this.state.duration}
                        />
                    </label>
                  </div>
                </div>
                  <div>
                      <input
                          style={styles.chipInputStyle}
                          type="submit"
                      />
                  </div>
                </form>
              </div>
      );
      default:
        return (<div></div>);
    }
  }

  handleChange = (e) => {
      e.preventDefault();
      this.setState({
          [e.target.name]:e.target.value,
      });
      //console.log(this.state);
  }

  componentWillMount(){
    this.getNotificationList();
  }

  render(){
    switch(this.state.mode){
      case 'loading':
        return (
          <div>
            <h1>Loading.......</h1>
            {this.renderAddButton()}
          </div>
        );
      case 'empty':
        return (
          <div>
            <h1>No Notifications to display.</h1>
            {this.renderAddButton()}
          </div>
        );
      case 'full':
        let NotificationPack = this.state.notifications.map((n) =>
            <Notification
              notificationId={n.notificationId}
              sender={n.sender}
              recipients={n.recipients}
              latitude={n.latitude}
              longitude={n.longitude}
              radius={n.radius}
              zoom={n.zoom}
              startdate={n.startdate}
              duration={n.duration}
              type={n.type}
            />
        );
        return (
            <div>
                <div style={styles.notificationPack}>
                    {NotificationPack}
                </div>
                {this.renderAddButton()}
            </div>
        );
      case 'adding':
        return (
          <div>
            <h1>Add a Notification</h1>
            <label>Time Based Notification: </label>
            <input type='radio' onInput={this.handleChange} name='type' value='time'/>
            {'  '}
            <label>Location Based Notification </label>
            <input type='radio' onInput={this.handleChange} name='type' value='space'/>
            {this.notificationForm()}
          </div>
        );
      default:
        return null;
    }
  }
}

const styles = {
    addButtonStyle:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        color:`${Theme.colors.darkBlue}`
    },
    addButtonStyleHover:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor: `${Theme.colors.darkBlue}`,
        color:`${Theme.colors.whiteBlue}`,
        borderRadius:"2px",
    },
    coursePack:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'flex-start',
    },
    formStyle: {
        display:'flex',
        flexDirection:'column',
        width: '100%',
    },
    formSectionStyle:{
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        flexDirection:'row',
        marginRight:'150px',
        width: '100%',
    },
    formInputStyle:{
        width:'400px',
        margin:'5px',
    },
  };

export default Notifications;
