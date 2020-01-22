import React, { Component } from 'react';
import { MdAddCircle } from 'react-icons/md';
import DateTimePicker from 'react-datetime-picker';
import fire from '../../data/Fire';
import Task from './Task';

class Tasks extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            creator: this.props.user.email,
            match: this.props.match,
            tasks: [],
            mode: 'loading',
            name: '',
            type: '',
            description: '',
            dueDateSetBy: '',
            due: '',
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
          "scheduledEvents": {
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
   addMode = () => {
       this.setState({
           mode:'adding',
       });
   };

   componentDidMount() {
     this.getTaskList();
   }

   createTask = e => {
     console.log(this.state);
     e.preventDefault();
     let taskRef = fire.database().ref(`/courses/${this.state.match.params.cId}/assignments/${this.state.match.params.aId}/tasks/`);
     let task = {
       name: this.state.name,
       type: this.state.type,
       description: this.state.description,
       dueDateSetBy: this.state.dueDateSetBy,
       due: this.state.due.toString(),
       creator: this.state.creator,
     };
     console.log(task);
     taskRef.push(task).then(()=>{
         this.getTaskList();
     }).catch((error)=>{
         console.log(`error:  ${error}`);
     });
   }

   getTaskList = () => {
     const { cId, aId } = this.state.match.params;
     let taskRef = fire.database().ref(`/courses/${cId}/assignments/${aId}/tasks/`);
     let taskList = [];
     taskRef.once('value', (snapshot) => {
         //console.log(snapshot);
         snapshot.forEach((child) => {
             console.log(`task: ${child.val()}`);

             taskList.push({
                     cId: this.state.match.params.cId,
                     aId:this.state.match.params.aId,
                     taskId:child.key,
                     name:child.val().name,
                     type:child.val().type,
                     description:child.val().description,
                     dueDateSetBy:child.val().dueDateSetBy,
                     due:child.val().due,
                     creator:child.val().creator,
                 });
             });
      console.log(taskList);
         this.setState({
             tasks: taskList,
             mode: taskList.length === 0 ? 'empty' : 'full',
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
               <p>Add Task</p>
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
                    <div style={styles.coursePack}>

                    {TaskPack}

                    </div>
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
        flexDirection:'column',
        width: '100%',
        height: '80%',
    },
    formSectionStyle:{
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'flex-start',
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
