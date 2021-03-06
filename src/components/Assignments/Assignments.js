import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { MdAddCircle } from 'react-icons/md';
import Theme from '../../data/Theme.json';
import fire from '../../data/Fire';
import Assignment from './Assignment';

/*
"assignments": [
  {
    "assignmentId": "0",
    "name":  "interviewing an industry professional",
    "description":  "interviewing an industry professional is an important look into how the carbon fiber weaving operations are run on a day to day basis.",
    "due": "",
    "status":  "incomplete",
    "isTemplate": false,
*/

class Assignments extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            courseId: this.props.courseId,
            assignments:this.props.assignments,
            match: this.props.match,
            name: '',
            description: '',
            due: '',
            status: '',
            isTemplate: false,
            editor:this.props.editor,
            mode:'loading',
        }
    }

    addMode = () => {
        this.setState({
            mode:'adding',
        });
    }

    componentDidMount = () => {
      this.getAssignmentList();
      //console.log(this.state);
    }

    getAssignmentList(){
      //console.log(this.state);
      let assignmentList = [];
      let assignmentRef = fire.database().ref(`/courses/${this.state.courseId}/assignments/`);
      assignmentRef.once('value', (snapshot) => {
          console.log(snapshot);
          snapshot.forEach((child) => {
              console.log(`assignment: ${child.val()}`);

              assignmentList.push({
                      courseId: this.state.courseId,
                      assignmentId:child.key, //"assignmentId": "0",
                      name:child.val().name, //"name":  "interviewing an industry professional",
                      description:child.val().description, //"description":  "interviewing an industry professional is an important look into how the carbon fiber weaving operations are run on a day to day basis.",
                      due:child.val().due, //"due": "",
                      status:child.val().status, //"status":  "incomplete",
                      isTemplate:child.val().isTemplate, //"isTemplate": false,
                      editor:this.state.editor
                  });
              });

          this.setState({
              assignments: assignmentList,
              mode: assignmentList.length === 0 ? 'empty' : 'full',
          });
      }).catch((error)=>{
          console.log(`error: ${error}`);
      });
    }

    createAssignment = (e) => {
      e.preventDefault();
      let assignmentRef = fire.database().ref(`/courses/${this.state.courseId}/assignments/`);
      let assignment = {
        name:this.state.name,
        description:this.state.description,
        due:this.state.due.toString(),
        status:this.state.status,
        isTemplate:this.state.isTemplate
      };
      //console.log(assignment);
      assignmentRef.push(assignment).then(()=>{
          this.getAssignmentList();
      }).catch((error)=>{
          console.log(`error:  ${error}`);
      });
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value,
        });
        console.log(this.state);
    }

    onChange = date => {
      //console.log(date);
      this.setState({ due: date });
    }

    editAssignment = (info) => {
      this.setState({
        name: info.name,
        description: info.description,
        due: info.due,
        status: info.status,
        isTemplate: info.isTemplate,
        mode: 'editing',
      });
    }

    renderAddAssignment(){
      //console.log(this.state);
      return (
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
                      <label className="switch">
                        Template?: {'  '}
                        <input
                          type="checkbox"
                          value={this.state.isTemplate}
                          onChange={() => this.setState({isTemplate: !this.state.isTemplate})}
                        />
                        <span className="slider round"></span>
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

    renderAddButton(){
        return(
            <div
              style={this.state.button ? styles.addButtonStyleHover : styles.addButtonStyle}
              onClick={this.addMode.bind(this)}
              onMouseOver={()=> this.setState({button: true})}
              onMouseLeave={()=> this.setState({button: false})}
            >
                <MdAddCircle/>
                <p>Add Assignment</p>
            </div>
        );
    }

    render(){
        console.log(`Assignments:  ${this.state.editor}`);
        let AssignmentPack = this.state.assignments.map((a) =>
            <Assignment
                user={this.state.user}
                editor={this.state.editor}
                assignmentId={a.assignmentId}
                name={a.name}
                description={a.description}
                due={a.due}
                status={a.status}
                isTemplate={a.isTemplate}
                match={this.state.match}
                edit={this.editAssignment.bind(this)}
            />
        );

        //console.log(this.state);

        switch(this.state.mode){
          case 'empty':
            return (
                <div style={styles.coursePack}>
                    <h3>No Assignments to Display.</h3>
                    {this.renderAddButton()}
                </div>
            );
          case 'full':
            return(
              <div>
                <div style={styles.coursePack}>
                    {AssignmentPack}
                </div>
                {this.renderAddButton()}
              </div>
            );
          case 'adding':
            return (
                <div style={styles.coursePack}>
                  {this.renderAddAssignment()}
                </div>
              );
          case 'editing':
            return  (
              <div style={styles.coursePack}>
                {this.renderAddAssignment()}
              </div>
            );
          case 'loading':
            return (
                <div style={styles.coursePack}>
                    <h3>Loading......</h3>
                </div>
            );
          default:
            return null;
        }


    }
}

const styles = {
    addButtonStyle:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        color:`${Theme.colors.darkBlue}`,
    },
    addButtonStyleHover:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor: `${Theme.colors.darkBlue}`,
        color:`${Theme.colors.whiteBlue}`,
        borderRadius:"2px",
        cursor: 'pointer',
    },
    coursePack:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        color:`${Theme.colors.darkBlue}`,
    },
    formStyle: {
        display:'flex',
        flexDirection:'column',
        width: '100%',
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

export default Assignments;
