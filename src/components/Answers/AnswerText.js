import React, { Component } from 'react';
import fire from '../../data/Fire';
import { MdWarning, MdDone, MdQuestionAnswer } from 'react-icons/md';
import {Link} from "react-router-dom";

class AnswerText extends Component{
  constructor(props){
    super(props);
    this.state = {
      match: this.props.match,
      name: this.props.name,
      description: this.props.description,
      number: this.props.number,
      answer:'',
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
      description: this.state.answer,
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
                <label>
                    Answer:{'  '}
                    <textarea
                        name="answer"
                        rows="10"
                        cols="120"
                        type="text"
                        placeholder="Record Answer in full sentences."
                        onInput={this.handleChange}
                        value={this.state.answer}
                    />
                </label>
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
        width: '100%',
    },
    formSectionStyle:{
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        flexDirection:'column',
        marginRight:'150px',
        width: '100%',
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

export default AnswerText;
