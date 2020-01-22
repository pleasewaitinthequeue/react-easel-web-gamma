import React, { Component } from 'react';
import Theme from "../../data/Theme";
import fire from '../../data/Fire';
import Question from "../Questions/Question";
import { MdAddCircle } from 'react-icons/md';

class Questions extends Component{
    constructor(props){
        super(props);
        this.state = {
            match:this.props.match,
            number: 1,
            name: '',
            description: '',
            answerType: '',
            status: '',
            questions: [],
        }
    }

    /*
    {
    "questionId":"0",
    "number":"1",
    "name":"question a",
    "description":"what kinds of details do you expect to learn from this individual that you could not otherwise know?",
    "answerType":"text",
    "status":"incomplete"
    }
  */

  addMode = () => {
      this.setState({
          mode:'adding',
      });
  };

  componentDidMount() {
    this.getQuestionList();
  }

  createQuestion = e => {
    const { cId, aId, tId } = this.state.match.params;
    e.preventDefault();
    let questionRef = fire.database().ref(`/courses/${cId}/assignments/${aId}/tasks/${tId}/questions`);
    let question = {
      number: this.state.number,
      name: this.state.name,
      description: this.state.description,
      answerType: this.state.answerType,
      status: 'incomplete',
    };
    console.log(question);
    questionRef.push(question).then(()=>{
        this.getQuestionList();
    }).catch((error)=>{
        console.log(`error:  ${error}`);
    });
  }

  getQuestionList = () => {
    const { cId, aId, tId } = this.state.match.params;
    let questionRef = fire.database().ref(`/courses/${cId}/assignments/${aId}/tasks/${tId}/questions`);
    let questionList = [];
    questionRef.once('value', (snapshot) => {
        //console.log(snapshot);
        snapshot.forEach((child) => {
            console.log(`task: ${child.val()}`);
            questionList.push({
                    cId: cId,
                    aId: aId,
                    tId: tId,
                    questionId: child.key,
                    number: child.val().number,
                    name:child.val().name,
                    description:child.val().description,
                    answerType: child.val().answerType,
                    status: child.val().status,
                });
            });
     console.log(questionList);
        this.setState({
            questions: questionList,
            number: questionList.length + 1,
            mode: questionList.length === 0 ? 'empty' : 'full',
        });
    }).catch((error)=>{
        console.log(`error: ${error}`);
    });
  }

  handleChange = (e) => {
      e.preventDefault();
      this.setState({
          [e.target.name]:e.target.value,
      });
      console.log(this.state);
  };

  onChange = date => {
    console.log(date);
    this.setState({ due: date });
  }

  renderAddButton(){
      return(
          <div style={styles.addButtonStyle} onClick={this.addMode.bind(this)}>
              <MdAddCircle/>
              <p>Add Question</p>
          </div>
      );
  }

  renderAddMode(){
    return(
      <div style={styles.formStyle}>
         <h1>Add Task</h1>
         <form onSubmit={this.createTask} style={styles.formStyle}>
             <div style={styles.formSectionStyle}>
                 <label>
                     Number:{'  '}
                     <input
                         name="number"
                         style={styles.formInputStyle}
                         type="text"
                         defaultValue={this.state.number}
                         onInput={this.handleChange}
                         value={this.state.number}
                     />
                 </label>
                 <label>
                   Type:  {'  '}
                   <select
                     value={this.state.type}
                     onChange={(event) => this.setState({type: event.target.value})}
                   >
                     <option value=""></option>
                     <option value="pre-task">pre-task</option>
                     <option value="main-task">main-task</option>
                     <option value="post-task">post-task</option>
                   </select>
                 </label>
                 <label>
                   Due Date Set By:  {'  '}
                   <select
                     value={this.state.dueDateSetBy}
                     onChange={(event) => this.setState({dueDateSetBy: event.target.value})}
                   >
                     <option value=""></option>
                     <option value="instructor">instructor</option>
                     <option value="student">student</option>
                   </select>
                 </label>
                 <label>
                     Description:{'  '}
                     <input
                         name="description"
                         style={styles.formInputStyle}
                         type="text"
                         placeholder="Interview a Professional in your Field"
                         onInput={this.handleChange}
                         value={this.state.description}
                     />
                 </label>
                 <label>
                   Status: {'  '}
                   <select
                     value={this.state.status}
                     onChange={(event) => this.setState({status: event.target.value})}
                   >
                     <option value=""></option>
                     <option value="draft">draft</option>
                     <option value="public">public</option>
                   </select>
                 </label>
                   <label>
                     Creator: {'  '}
                     <input
                       name="creator"
                       type="text"
                       value={this.state.creator}
                       onChange={() => this.setState({isTemplate: !this.state.isTemplate})}
                     />
                   </label>
                 <div>
                     <input
                         style={styles.chipInputStyle}
                         type="submit"
                     />
                 </div>
             </div>
         </form>
      </div>
    );
  }

  render(){
      switch(this.state.mode){
        case 'loading':
          return(
            <div>
              <h3>Loading.......</h3>
            </div>
          );
        case 'adding':
          return(
            <div>
              {this.renderAddMode()}
            </div>
          );
        case 'empty':
          return(
            <div>
              <h3>No Questions to Display</h3>
              {this.renderAddButton()}
            </div>
          );
        case 'full':
          let QuestionPack = this.state.questions.map((q)=>
              <Question
                  questionId={q.questionId}
                  number={q.number}
                  name={q.name}
                  description={q.description}
                  answerType={q.answerType}
                  status={q.status}
                  match={this.state.match}
              />
          );
          return(
              <div style={styles.cardStyle}>
                  <p style={styles.textStyle}>Questions</p>
                  {QuestionPack}
              </div>


          );
        default:
          return (<></>);
      }

  }
}

const styles = {
    cardStyle:{
        display:'flex',
        flexDirection:'column',
        height:'100%',
        width:'100%',
        margin:'0px',
        border:`1px solid ${Theme.colors.darkBlue}`
    },
    textStyle:{
        height:'100%',
        width:'100%',
    }
};

export default Questions;
