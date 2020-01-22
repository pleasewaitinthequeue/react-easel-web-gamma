import React, { Component } from 'react';
//import data from "../../data/Courses";
import fire from '../../data/Fire';
import Tasks from '../Tasks/Tasks';
import {Link} from "react-router-dom";

class AssignmentMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            match:this.props.match,
            info: {
              assignmentId: '',
              name: '',
              description: '',
              due: '',
              status: '',
              isTemplate: '',
              tasks: [],
            }, //data.courses[this.props.match.params.cId].assignments[this.props.match.params.aId],
        }
    }

    getAssignmentInfo(){
      const { aId, cId } = this.state.match.params;
      let assignmentRef = fire.database().ref(`/courses/${cId}/assignments/${aId}`);
      return assignmentRef.once('value', (snapshot) => {
          console.log(`assignment details: ${snapshot.key} ${snapshot.val()}`);
          this.setState({
            assignmentId: snapshot.key,
            name: snapshot.val().name,
            description: snapshot.val().description,
            due: snapshot.val().due,
            status: snapshot.val().status,
            isTemplate: snapshot.val().isTemplate,
          });
      });
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
        const { cId, aId } = this.state.match.params;
        return(
            <div>

                <div>
                    <Link exact replace to={`/Dashboard`}>Dashboard</Link>{' '}>{' '}
                    <Link exact replace to={`/Courses/${cId}`}>Course</Link>{' '}>{' '}
                    <Link exact replace to={`/c/${cId}/Assignments/${aId}`}>Assignment</Link>
                </div>
                <div>
                    <h1>{this.state.info.name}</h1>
                    <h3>{this.state.info.description}</h3>
                    <h5>{this.state.info.status}</h5>
                    <h5>{this.state.info.due.toString()}</h5>
                    <Tasks match={this.state.match} user={this.state.user}/>
                </div>
            </div>
        );
    }
}

export default AssignmentMain;
