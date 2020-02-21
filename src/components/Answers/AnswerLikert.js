import React, { Component } from 'react';
import fire from '../../data/Fire';
import { MdWarning, MdDone, MdQuestionAnswer } from 'react-icons/md';
import {Link} from "react-router-dom";

class AnswerLikert extends Component{
  constructor(props){
    super(props);
    this.state = {
      match: this.props.match,
      name: this.props.name,
      description: this.props.description,
      number: this.props.number,
      likert:'',
      answerType: this.props.answerType,
    }
  }



  createAnswer = (e) => {
    const { cId, aId, tId, qId } = this.state.match.params;
    let user = fire.auth().currentUser;
    e.preventDefault();
    let answerRef = fire.database().ref(`/courses/${cId}/assignments/${aId}/tasks/${tId}/questions/${qId}/answers/`);
    let answer = {
      answerer:  user.email,
      description: this.state.likert,
      answerType: this.state.answerType,
    };

    answerRef.push(answer).then(()=>{
        this.props.action('complete', 'loaded');
    }).catch((error)=>{
        console.log(`error:  ${error}`);
    });
  }

  handleChange = (e) => {
      e.preventDefault();
      this.setState({
          [e.target.name]:e.target.value,
      });
      console.log(this.state);
  };

  render(){
    const { aId, cId, tId, qId } = this.state.match.params;
    return (
      <div>
          <div>
              <Link exact="true" replace to={`/Dashboard`}>Dashboard</Link>{' '}>{' '}
              <Link exact="true" replace to={`/Courses/${cId}`}>Course</Link>{' '}>{' '}
              <Link exact="true" replace to={`/c/${cId}/Assignments/${aId}`}>Assignment</Link>{' '}>{' '}
              <Link exact="true" replace to={`/c/${cId}/a/${aId}/Tasks/${tId}`}>Task</Link>{' '}>{' '}
              <Link exact="true" replace to={`/c/${cId}/a/${aId}/t/${tId}/Questions/${qId}`}>Question</Link>
          </div>
          <div>
              <h2>{this.state.number}{'.'}{'  '}{this.state.name}</h2>
              <h4>{this.state.description}</h4>
          </div>
          <div>
            <form onSubmit={this.createAnswer} style={styles.formStyle}>
              <div style={styles.formSectionStyle}>
                <div style={styles.formStyle}>
                  <label>Strongly agree</label>
                  <input type="radio" name="likert" value="strongly_agree" onInput={this.handleChange}/>
                </div>
                <div style={styles.formStyle}>
                  <label>Agree</label>
                  <input type="radio" name="likert" value="agree" onInput={this.handleChange}/>
                </div>
                <div style={styles.formStyle}>
                  <label>Neutral</label>
                  <input type="radio" name="likert" value="neutral" onInput={this.handleChange}/>
                </div>
                <div style={styles.formStyle}>
                  <label>Disagree</label>
                  <input type="radio" name="likert" value="disagree" onInput={this.handleChange}/>
                </div>
                <div style={styles.formStyle}>
                  <label>Strongly disagree</label>
                  <input type="radio" name="likert" value="strongly_disagree" onInput={this.handleChange}/>
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
      </div>
    );
  }
}

const styles = {
    iconStyle:{
        height:'25px',
        width:'25px',
    },
    iconPanel:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    disabledIconStyle:{
        height:'25px',
        width:'25px',
        opacity: '.6',
        cursor:'not-allowed',
    },
    addButtonStyle:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    formStyle: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    formSectionStyle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        flexDirection:'row',
        marginRight:'150px',
        width: '100%',
        height: '50px',
    },
    formInputStyle:{
        width:'400px',
        margin:'5px',
    },
    formTextAreaStyle:{
        width:'400px',
        margin:'5px',
        height:'300px',
    },
}

export default AnswerLikert;
