import React, { Component } from 'react';
import { MdTimer } from 'react-icons/md';

//used this article to help inform the timer design
//https://codeburst.io/lets-build-a-countdown-timer-with-react-part-1-2e7d5692d914

class TimerComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      shown: 'hidden',
      minutes: '00',
      seconds: '00',
      defaultMinutes: '00',
      defaultSeconds: '00',
      secondsRemaining: 0,
      header: 'Set Desired Time',
    }
  }

  handleChange = (event) => {
      event.preventDefault();
      this.setState({
          [event.target.name]:event.target.value,
      });
  }

  tick = () => {
    var min = Math.floor(this.state.secondsRemaining / 60);
    var sec = this.state.secondsRemaining - (min * 60);
    console.log(`min: ${min}, sec: ${sec}`);
    if (sec < 10) {
      this.setState({
        seconds: "0" + sec,
      });
    } else{
      this.setState({seconds: sec});
    }
    if (min < 10) {
      this.setState({
        minutes: "0" + min,
      });
    } else {
      this.setState({minutes: min})
    }

    if (min === 0 & sec === 0) {
      clearInterval(this.intervalHandle);
      this.setState({header:"Time is Up!"})
    } else {
      this.setState({secondsRemaining: this.state.secondsRemaining - 1})
      this.secondsRemaining--;
    }
  }

  intervalHandle = () => {
    return(
      <div>
        <h1>Time's Up!</h1>
      </div>
    );
  }

  startCountDown = () => {
    this.intervalHandle = setInterval(this.tick, 1000);
    //console.log(Number(this.state.minutes), Number(this.state.seconds));
    let time = Number(this.state.minutes) * 60 + Number(this.state.seconds);
    //console.log(time);
    this.setState({
      secondsRemaining: time,
      defaultMinutes: this.state.minutes,
      defaultSeconds: this.state.seconds,
      header: "Counting Down ...",
    });
  }

  showTimer = () => {
    this.setState({shown:'shown'});
  }

  hideTimer = () => {
    this.setState({shown:'hidden'});
  }

  resetInterval = () => {
    clearInterval(this.intervalHandle);
    this.setState({
      minutes: this.state.defaultMinutes,
      seconds: this.state.defaultSeconds,
      header: "Set Desired Time",
    });
  }

  render(){
    switch(this.state.shown){
        case 'shown':
          return(
            <div style={styles.timerStyle}>
              <MdTimer size="100px"/>
              <div style={styles.divStyle}>
                <h3>{this.state.header}</h3>
                <div>
                <input
                  style={styles.inputStyle}
                  value={this.state.minutes}
                  name="minutes"
                  type="text"
                  required
                  onChange={this.handleChange}
                />{' : '}
                <input
                  style={styles.inputStyle}
                  value={this.state.seconds}
                  name="seconds"
                  type="number"
                  onChange={this.handleChange}
                  placeholder={this.state.seconds}
                />
                </div>
              </div>
              <div>
                <h1>{this.state.minutes}:{this.state.seconds}</h1>
              </div>
              <div>
                <button onClick={this.startCountDown}>Start</button>
                <button onClick={this.resetInterval}>Reset</button>
              </div>
              <div
                onMouseOver={() => this.setState({button:true})}
                onMouseLeave={() => this.setState({button: false})}
                style={this.state.button ? styles.hideButtonStyleHover : styles.hideButtonStyle}
                onClick={this.hideTimer}>
                <h3>Hide</h3>
              </div>

            </div>
          );
        case 'hidden':
          return(
            <div style={styles.hiddenStyle} onClick={this.showTimer}>
              <MdTimer style={this.iconStyle}/>
            </div>
          );
        default:
          return null;
    }
  }
}

const styles = {
  iconStyle:{
    height:"25px",
    width:"25px",
  },
  timerStyle: {
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    right: "0px",
    top:"0px",
    height: "100%",
    width: "200px",
    backgroundColor:"#ecf4ff",
    border: "1px solid #1c4c79",
    borderBottom: "5px solid #1c4c79",
  },
  inputStyle: {
    width:"30px",
  },
  divStyle: {
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
  },
  hiddenStyle:{
    height:"100%",
    width:"25px",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    right: "0px",
    top:"0px",
    backgroundColor:"#ecf4ff",
    border: "1px solid #1c4c79",
    borderBottom: "5px solid #1c4c79",
  },
  hideButtonStyle:{
    position:"absolute",
    textAlign:"center",
    bottom:"5px",
    width:"80%",
    height:"25px",
    border: "1px solid #1c4c79",
    borderRadius:"2px",
    boxShadow:"1px 1px #1c4c79",
  },
  hideButtonStyleHover:{
    position:"absolute",
    textAlign:"center",
    bottom:"5px",
    width:"80%",
    height:"25px",
    border: "1px solid #1c4c79",
    borderRadius:"2px",
    boxShadow:"1px 1px #1c4c79",
    backgroundColor:"#1c4c79",
    color: "#ecf4ff",
  }
};

export default TimerComponent;
