import React, { Component } from 'react';
//import data from "../../data/Courses";
import fire from '../../data/Fire';
import Tasks from '../Tasks/Tasks';
import {Link} from "react-router-dom";

class AssignmentMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            match:this.props.match,
            info: {
              assignmentId: null,
              name: null,
              description: null,
              due: new Date(),
              status: null,
              isTemplate: null,
              tasks: [],
            }, //data.courses[this.props.match.params.cId].assignments[this.props.match.params.aId],
        }
    }

    getAssignmentInfo(){
      const { aId, cId } = this.state.match.params;
      let assignmentRef = fire.database().ref(`/courses/${cId}/assignments/${aId}`);
      return assignmentRef.once('value', (snapshot) => {
          console.log(`assignment details: ${snapshot.key} ${snapshot.val()}`);
          let taskList = this.getTasks();
          this.setState({
            assignmentId: snapshot.key,
            name: snapshot.val().name,
            description: snapshot.val().description,
            due: snapshot.val().due,
            status: snapshot.val().status,
            isTemplate: snapshot.val().isTemplate,
            tasks: taskList,
          });
      });
    }

    getTasks(){
      const { aId, cId } = this.state.match.params;
      let taskList = [];
      let taskRef = fire.database().ref(`/courses/${cId}/assignments/${aId}/tasks`);
      return taskRef.once('value', (snapshot) => {
        snapshot.forEach((child) => {
          taskList.push({
            taskId: child.key,
            name: child.val().name,
            type: child.val().type,
            description: child.val().description,
            dueDateSetBy: child.val().dueDateSetBy,
            scheduledEvent: {},
            dueDate: child.val().dueDate,
            creator: child.val().creator,
          });
        });
        return taskList;
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
                    <Tasks tasks={this.state.info.tasks} match={this.state.match}/>
                </div>
            </div>
        );
    }
}

export default AssignmentMain;
