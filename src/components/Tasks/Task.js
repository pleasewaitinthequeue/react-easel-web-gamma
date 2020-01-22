import React, { Component } from 'react';
import Theme from '../../data/Theme.json';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

class Task extends Component{
    constructor(props){
        super(props);
        this.state = {
            match:this.props.match,
            taskId:this.props.taskId,
            name:this.props.name,
            type:this.props.type,
            description:this.props.description,
            dueDateSetBy:this.props.dueDateSetBy,
            scheduledEvent:this.props.scheduledEvent,
            due:this.props.due,
            status:this.props.status,
            questions:this.props.questions,
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
        return(
            <div>
              <Link replace exact to={`/c/${this.state.match.params.cId}/a/${this.state.match.params.aId}/Tasks/${this.state.taskId}/`}>
                  <div style={styles.cardStyle}>
                      <p>{this.state.name}</p>
                      <p>{this.state.type}</p>
                      <p>{this.state.description}</p>
                  </div>
              </Link>
            </div>
        );
    }
}

const styles = {
    cardStyle:{
        display:'flex',
        flexDirection:'column',
        height:'150px',
        width:'300px',
        padding:'5px',
        margin:'5px',
        border:`1px solid ${Theme.colors.darkBlue}`,
    }
};

export default withRouter(Task);
