import React, { Component } from 'react';
//import data from "../../data/Courses";
import fire from '../../data/Fire';
import { MdWarning, MdDone, MdQuestionAnswer } from 'react-icons/md';
import {Link} from "react-router-dom";

class QuestionMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            match:this.props.match,
            mode: 'loading',
            number: 1,
            name: '',
            description: '',
            answerType: '',
            status: '',
        }
    }

    /*
    sample document for question: {
    "questionId":"0",
    "number":"1",
    "name":"question a",
    "description":"what kinds of details do you expect to learn from this individual that you could not otherwise know?",
    "answerType":"text",
    "status":"incomplete"
    }
    */

    /*
    sample document for answer:  {
      answerid: autogenerated
      answerer:  userid of answering party [jomalair@iu.edu]
      answertype:  [text][video][audio][image]
      title:  [nullable, used only for video / audio / image]
      caption:  [nullable, used only for video / audio / image]
      description:  [nullable, text only, unused for video / audio / image]
      url:  [nullable, used only for video / audio / image]
      answertype:  [text][video][audio][image]
      status:  incomplete / complete
      }

    */

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value,
        });
        console.log(this.state);
    };

    getQuestionInfo(){
      const { aId, cId, tId, qId } = this.state.match.params;
      let questionRef = fire.database().ref(`/courses/${cId}/assignments/${aId}/tasks/${tId}/questions/${qId}`);
      return questionRef.once('value', (snapshot) => {
          console.log(`task details: ${snapshot.key} ${snapshot.val()}`);
          this.setState({
            cId: cId,
            aId: aId,
            tId: tId,
            qId: qId,
            number: snapshot.val().number,
            name: snapshot.val().name,
            description: snapshot.val().description,
            answerType: snapshot.val().answerType,
            status: snapshot.val().status,
            mode: 'loaded',
            answer: '',
          });
      });
    }

    renderIcon(){
        switch(this.state.status){
            case 'incomplete':
                return(
                    <div style={styles.iconPanel}>
                        <p>{this.state.status}</p>
                        <MdWarning style={styles.iconStyle} />
                    </div>
                );
            case 'complete':
                return(
                    <div style={styles.iconPanel}>
                        <p>{this.state.status}</p>
                        <MdDone style={styles.iconStyle} />
                    </div>
                );
            default:
                return null;
        }

    }

    answerQuestion = () => {
      this.setState({ mode: 'answering' });
    }

    createAnswer = (e) => {
      const { cId, aId, tId, qId } = this.state.match.params;
      let user = fire.auth().currentUser;
      e.preventDefault();
      let answerRef = fire.database().ref(`/courses/${cId}/assignments/${aId}/tasks/${tId}/questions/${qId}/answers/`);
      let answer = {
        answerer:  user.email,
        title:  '',
        caption:  '',
        description: this.state.answer,
        url:  '',
        answerType: this.state.answerType,
      };

      answerRef.push(answer).then(()=>{
          this.setState({
            status: 'complete',
            mode:'loaded'
          });
          this.updateQuestion();
      }).catch((error)=>{
          console.log(`error:  ${error}`);
      });
    }

    updateQuestion(key, value){
      const { cId, aId, tId, qId } = this.state.match.params;
      let questionRef = fire.database().ref(`/courses/${cId}/assignments/${aId}/tasks/${tId}/questions/${qId}`);
      questionRef.update(key, value);
    }

    renderAnswerIcon(){
      switch(this.state.status){
        case 'incomplete':
          return(
            <div style={styles.addButtonStyle} onClick={this.answerQuestion}>
                <MdQuestionAnswer style={styles.iconStyle}/>
                <p>Answer</p>
            </div>
          );
        case 'complete':
          return(
            <div style={styles.addButtonStyle}>
              <MdQuestionAnswer style={styles.disabledIconStyle}/>
              <p>answer</p>
            </div>
          );
        default:
          return null;
      }
    }

    componentDidMount(){
      this.getQuestionInfo();
    }

    render(){
        const { cId, aId, tId, qId } = this.state.match.params;

        switch(this.state.mode){
          case 'loading':
            return(
                <div>
                    <div>
                        <Link exact="true" replace to={`/Dashboard`}>Dashboard</Link>{' '}>{' '}
                        <Link exact="true" replace to={`/Courses/${cId}`}>Course</Link>{' '}>{' '}
                        <Link exact="true" replace to={`/c/${cId}/Assignments/${aId}`}>Assignment</Link>{' '}>{' '}
                        <Link exact="true" replace to={`/c/${cId}/a/${aId}/Tasks/${tId}`}>Task</Link>{' '}>{' '}
                        <Link exact="true" replace to={`/c/${cId}/a/${aId}/t/${tId}/Questions/${qId}`}>Question</Link>
                    </div>
                    <div>
                        <h3> loading ........ </h3>
                    </div>
                </div>
            );
          case 'loaded':
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
                        {this.renderIcon()}
                        {this.renderAnswerIcon()}
                    </div>
                </div>
            );
          case 'answering':
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
                      {this.renderIcon()}
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
          default:
            return null;
        }
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

export default QuestionMain;
