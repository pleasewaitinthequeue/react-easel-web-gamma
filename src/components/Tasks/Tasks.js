import React, { Component } from 'react';
import Task from './Task';

class Tasks extends Component{
    constructor(props){
        super(props);
        this.state = {
            match: this.props.match,
            tasks: this.props.tasks,
            mode: this.props.tasks.length > 0 ? 'loading' : 'empty',
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
        switch(this.state.mode){
          case 'loading':
            return(
              <div>
                <h3>Loading.......</h3>
              </div>
            );
          case 'adding':
          case 'empty':
            return(
              <div>
                <h3>No Tasks to Display</h3>
              </div>
            );
          case 'full':
            let TaskPack = this.state.tasks.map((t)=>
                <Task taskId={t.taskId} name={t.name} type={t.type} description={t.description}
                      dueDateSetBy={t.dueDateSetBy} scheduledEvent={t.scheduledEvent} dueDate={t.dueDate}
                      creator={t.creator} due={t.due} status={t.status} questions={t.questions} match={this.props.match} />
            );
            return(
                <div>
                    <h1>Tasks</h1>
                    {TaskPack}
                </div>
            );
          default:
            return (<></>);
        }

    }
}

export default Tasks;
