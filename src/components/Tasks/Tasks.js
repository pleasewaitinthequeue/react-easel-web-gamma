import React, { Component } from 'react';
import { MdAddCircle } from 'react-icons/md';
import DateTimePicker from 'react-datetime-picker';

import Task from './Task';

class Tasks extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            creator: this.props.user.email,
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
   addMode = () => {
       this.setState({
           mode:'adding',
       });
   };

   createTask(){

   }

   handleChange = (e) => {
       e.preventDefault();
       this.setState({
           [e.target.name]:e.target.value,
       });
       console.log(this.state);
   };

   renderAddButton(){
       return(
           <div style={styles.addButtonStyle} onClick={this.addMode.bind(this)}>
               <MdAddCircle/>
               <p>Add Task</p>
           </div>
       );
   }

   renderAddMode(){
     return(
       <div style={styles.formStyle}>
          <h1>Add Course</h1>
          <form onSubmit={this.createAssignment} style={styles.formStyle}>
              <div style={styles.formSectionStyle}>
                  <label>
                      Name:{'  '}
                      <input
                          name="name"
                          style={styles.formInputStyle}
                          type="text"
                          placeholder="Interview Assignment"
                          onInput={this.handleChange}
                          value={this.state.name}
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
                      Due Date: {'  '}
                      <DateTimePicker
                        onChange={this.onChange}
                        value={this.state.due}
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
                <h3>No Tasks to Display</h3>
                {this.renderAddButton()}
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
    coursePack:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'flex-start',
    },
    formStyle: {
        display:'flex',
        flexDirection:'row',
        width: '100%',
    },
    formSectionStyle:{
        display:'flex',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        flexDirection:'column',
        marginRight:'150px',
        width: '100%',
    },
    formInputStyle:{
        width:'400px',
        margin:'5px',
    },
    chipSectionStyle:{
        display:'flex',
        alignItems:'flex-start',
        flexDirection:'column',
        marginLeft:'0px',
        width: '100%',
    },
    chipDivStyle: {
        fontSize:'12px',
    },
    chipInputStyle: {
        width: '200px',
        margin:'5px',
    },
    chipContainerStyle:{
        display:'flex',
        flexDirection:'column',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'flex-start',
    },
};

export default Tasks;
