import React, { Component } from 'react';
import data from '../../data/Courses';
import Theme from '../../data/Theme.json';
import Questions from '../Questions/Questions';
import {Link} from "react-router-dom";

class TaskMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            match:this.props.match,
            info:
                data.courses[this.props.match.params.cId]
                    .assignments[this.props.match.params.aId]
                    .tasks[this.props.match.params.tId],
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
                "dueDate":  "",
                "creator":  "jomalair@iu.edu"
            },
     */

    render(){
        const { cId, aId, tId } = this.state.match.params;
        return(
            <div>
                <div>
                    <Link exact replace to={`/Dashboard`}>Dashboard</Link>{' '}>{' '}
                    <Link exact replace to={`/Courses/${cId}`}>Course</Link>{' '}>{' '}
                    <Link exact replace to={`/c/${cId}/Assignments/${aId}`}>Assignment</Link>{' '}>{' '}
                    <Link exact replace to={`/c/${cId}/a/${aId}/Tasks/${tId}`}>Task</Link>
                </div>
                <div style={styles.cardStyle}>
                    <h4>Task:  {this.state.info.name}</h4>
                    <p>{this.state.info.description}</p>
                    <Questions questions={this.state.info.questions} match={this.state.match}/>
                </div>
            </div>
        );
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
        border:`1px solid ${Theme.colors.darkBlue}`
    }
};

export default TaskMain;