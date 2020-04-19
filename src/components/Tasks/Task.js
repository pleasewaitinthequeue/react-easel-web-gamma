import React, { Component } from 'react';
import Theme from '../../data/Theme.json';
import { MdModeEdit, MdLaunch } from 'react-icons/md';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

class Task extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:this.props.user,
            match:this.props.match,
            editor:this.props.editor,
            info:{
              taskId:this.props.taskId,
              name:this.props.name,
              type:this.props.type,
              description:this.props.description,
              dueDateSetBy:this.props.dueDateSetBy,
              scheduledEvent:this.props.scheduledEvent,
              due:this.props.due,
              status:this.props.status,
            },
            editTask:this.props.editTask,
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
    editMode = () => {
     this.state.editTask(this.state.info);
    }

    editIcon = () => {
     console.log(`Task:  ${this.state.editor}`);
     if(this.state.editor){
       return(
         <div
           style={this.state.editHover ? styles.iconDivStyleHover : styles.iconDivStyle}
           onClick={this.editMode}
           onMouseEnter={() => this.setState({editHover: true})}
           onMouseLeave={() => this.setState({editHover: false})}
         >
           <MdModeEdit style={styles.iconStyle} />
         </div>
       );
     }
    }

    render(){
        return(
            <div style={styles.cardStyle}>
              <p>{this.state.info.name}</p>
              <p>{this.state.info.type}</p>
              <p>{this.state.info.description}</p>
              <Link
                replace
                exact
                to={{
                  pathname:`/c/${this.state.match.params.cId}/a/${this.state.match.params.aId}/Tasks/${this.state.info.taskId}/`,
                  state:{
                    editor:this.state.editor,
                  }
                }}
              >
              <div
                style={this.state.launchHover ? styles.launchDivStyleHover : styles.launchDivStyle}
                onMouseEnter={() => this.setState({launchHover: true})}
                onMouseLeave={() => this.setState({launchHover: false})}
              >
                <MdLaunch style={styles.iconStyle} />
              </div>
              </Link>
              {this.editIcon()}
            </div>
        );
    }
}

const styles = {
  cardStyle:{
    position: 'relative',
      height:'150px',
      width:'300px',
      borderRadius:'5px',
      border:`1px solid ${Theme.colors.darkBlue}`,
      boxShadow:`2px 2px ${Theme.colors.darkBlue}`,
      display:'flex',
      flexDirection:'column',
      margin:"5px",
      padding:'5px',
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

export default withRouter(Task);
