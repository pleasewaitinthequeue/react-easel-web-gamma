import React, { Component } from 'react';
//import data from '../../data/Courses';
import fire from '../../data/Fire';
import Theme from '../../data/Theme.json';
import Questions from '../Questions/Questions';
import {Link} from "react-router-dom";

class TaskMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:this.props.user,
            match:this.props.match,
            editor:this.props.location.state.editor,
            courseId: this.props.match.params.cId,
            aId: this.props.match.params.aId,
            tId: this.props.match.params.tId,
            mode: 'loading',
            name: '',
            description: '',
            due: '',
            dueDateSetBy: '',
            type: '',
            creator: '',
                //data.courses[this.props.match.params.cId].assignments[this.props.match.params.aId].tasks[this.props.match.params.tId],
        }
    }

    /*
    "tasks": [
            {
              "taskId": "0",
              "name":  "pre-interview questions",
              "type":  "pre-task",
              "description":  "answer each of the questions prior to completing your interview",
              "dueDateSetBy":  "instructor",
              "scheduledEvent": {
                "eventId": "0",
                "eventName":  "interview event",
                "location": {
                "latitude":  "39.756014",
                "longitude":  "-86.153205",
                "name":  "At John Manager's Office"
                },
                "due":  "",
                "creator":  "jomalair@iu.edu"
            },
     */

     componentDidMount(){
       this.getAssignmentInfo();
     }
     getAssignmentInfo(){
       const { aId, cId, tId } = this.state.match.params;
       console.log(aId, cId, tId);
       let taskRef = fire.database().ref(`/courses/${cId}/assignments/${aId}/tasks/${tId}`);
       return taskRef.once('value', (snapshot) => {
           console.log(`task details: ${snapshot.key} ${snapshot.val()}`);
           this.setState({
             courseId: cId,
             aId: aId,
             taskId: snapshot.key,
             name: snapshot.val().name,
             description: snapshot.val().description,
             due: snapshot.val().due,
             dueDateSetBy: snapshot.val().dueDateSetBy,
             type: snapshot.val().type,
             creator: snapshot.val().creator,
             mode: 'loaded',
           });
       });
     }

    render(){
        const { cId, aId, tId } = this.state.match.params;

        switch(this.state.mode){
          case 'loading':
            return(<h3>Loading.......</h3>);
          case 'loaded':
            return(
                <div>
                    <div>
                        <Link exact replace to={`/Dashboard`}>Dashboard</Link>{' '}>{' '}
                        <Link exact replace to={`/Courses/${cId}`}>Course</Link>{' '}>{' '}
                        <Link
                          exact
                          replace
                          to={{
                            pathname: `/c/${cId}/Assignments/${aId}`,
                            state:{
                              editor:this.state.editor,
                            }
                          }}>Assignment</Link>{' '}>{' '}
                        <Link
                          exact
                          replace
                          to={{
                            pathname:`/c/${cId}/a/${aId}/Tasks/${tId}`,
                            state:{
                              editor:this.state.editor,
                            }
                          }}>Task</Link>
                    </div>
                    <div style={styles.cardStyle}>
                        <h4>Task:  {this.state.name}</h4>
                        <p>{this.state.description}</p>
                        <Questions
                          match={this.state.match}
                          user={this.state.user}
                          editor={this.state.editor}
                        />
                    </div>
                </div>
            );
          default:
            return(<h3>Oops, something went wrong.</h3>);
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
    padding:'5px',
    border:`1px solid ${Theme.colors.darkBlue}`,
    borderRadius:`5px`,
    color:`${Theme.colors.darkBlue}`,
  },
  iconStyle:{
    fontSize:'30px',
  },
  iconDivStyle:{
    position:'absolute',
    backgroundColor: `${Theme.colors.whiteBlue}`,
    color: `${Theme.colors.darkBlue}`,
    margin: '5px',
    borderRadius: '5px',
    border: `1px solid ${Theme.colors.darkBlue}`,
    right: '0px',
    bottom: '0px',
  },
  iconDivStyleHover:{
    position:'absolute',
    backgroundColor: `${Theme.colors.darkBlue}`,
    color: `${Theme.colors.whiteBlue}`,
    margin: '5px',
    borderRadius: '5px',
    border: `1px solid ${Theme.colors.darkBlue}`,
    right: '0px',
    bottom: '0px',
    cursor: 'pointer',
  },
  launchDivStyle:{
    position:'absolute',
    backgroundColor: `${Theme.colors.whiteBlue}`,
    color: `${Theme.colors.darkBlue}`,
    margin: '5px',
    borderRadius: '5px',
    border: `1px solid ${Theme.colors.darkBlue}`,
    left: '0px',
    bottom: '0px',
  },
  launchDivStyleHover:{
    position:'absolute',
    backgroundColor: `${Theme.colors.darkBlue}`,
    color: `${Theme.colors.whiteBlue}`,
    margin: '5px',
    borderRadius: '5px',
    border: `1px solid ${Theme.colors.darkBlue}`,
    left: '0px',
    bottom: '0px',
    cursor: 'pointer',
  },
};

export default TaskMain;
