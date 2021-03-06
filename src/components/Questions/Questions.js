import React, { Component } from 'react';
import Theme from "../../data/Theme";
import fire from '../../data/Fire';
import Question from "../Questions/Question";
import { MdAddCircle } from 'react-icons/md';

class Questions extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:this.props.user,
            editor:this.props.editor,
            match:this.props.match,
            number: 1,
            name: '',
            description: '',
            answerType: '',
            url: '',
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
  }

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
      url: this.state.url,
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
                    url: child.val().url,
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
  }

  renderAddButton(){
      return(
          <div
            style={this.state.button ? styles.addButtonStyleHover : styles.addButtonStyle}
            onClick={this.addMode.bind(this)}
            onMouseOver={() => this.setState({button:true})}
            onMouseLeave={() => this.setState({button:false})}
            >
              <MdAddCircle/>
              <p>Add Question</p>
          </div>
      );
  }

  showContentInputBox(){
    switch(this.state.answerType){
      case 'youtube':
      return(
          <label>
           URL: {'  '}
           <textarea
               name="url"
               rows="10"
               cols="120"
               type="text"
               placeholder="Submit the Unique Id for your Youtube Video - a group of letters and numbers at the end of the URL"
               onInput={this.handleChange}
               value={this.state.url}
           />
          </label>
        );
      case 'url':
        return (
          <input
            name="url"
            type="text"
            placeholder="Submit the External Link"
            onInput={this.handleChange}
            value={this.state.url}
          />
        );
      default:
        return null;
    }
  }

  renderAddMode(){
    return(
      <div style={styles.formStyle}>
         <h1>{() => this.state.mode === 'adding' ? 'Add' : 'Edit'} Question</h1>
         <form onSubmit={this.createQuestion} style={styles.formStyle}>
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
                     Name:{'  '}
                     <input
                         name="name"
                         style={styles.formInputStyle}
                         type="text"
                         defaultValue={this.state.name}
                         onInput={this.handleChange}
                         value={this.state.name}
                     />
                 </label>
                 <label>
                     Description:{'  '}
                     <input
                         name="description"
                         style={styles.formInputStyle}
                         type="text"
                         placeholder="Describe the question you are asking."
                         onInput={this.handleChange}
                         value={this.state.description}
                     />
                 </label>
                 <label>
                   Answer Type:  {'  '}
                   <select
                     value={this.state.answerType}
                     onChange={(event) => this.setState({answerType: event.target.value})}
                   >
                     <option value="text">text</option>
                     <option value="likert">likert</option>
                     <option value="url">url</option>
                     <option value="youtube">youtube</option>
                   </select>
                 </label>
                 {this.showContentInputBox()}
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
        case 'editing':
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
                user={this.state.user}
                editor={this.state.editor}
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
                  {this.renderAddButton()}
              </div>


          );
        default:
          return (<></>);
      }

  }
}

const styles = {
  addButtonStyle:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-start',
  },
  addButtonStyleHover:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-start',
      backgroundColor: "#1c4c79",
      color:"#ecf4ff",
      borderRadius:"2px",
  },
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
