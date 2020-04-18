import React, { Component } from 'react';
import Course from './Course';
import fire from '../../data/Fire';
import { MdAddCircle } from 'react-icons/md';
import ChipLister from '../common/ChipLister';
import Theme from '../../data/Theme.json';
//import data from '../../data/Courses.json';

/*
Passing Data Between React Components (up to Parent)
https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17
 */

class Courses extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            courses: this.props.courses,
            mode:'loading',
            owner:this.props.user.email,
            students: [],
            managers: [],
        }
    }

    /*
    "courses": [
        {
            "courseId":"0",
            "owner":"jomalair@iu.edu",
            "managers":["jomalair@iu.edu"],
            "name":"MET-35600-24524",
            "school":"Mechanical Engineering Technology",
            "title":"carbon fiber basket weaving for electric automobile tires",
            "description":"students in the course will learn how to weave carbon fiber together to make futuristic automobile tires fit for an elon musk dream.",
            "students": ["jomalair@iu.edu", "annamath@iu.edu", "nfurniss@iu.edu", "drkulkar@iu.edu" ],
            "assignments": [],
            "announcements": []
        }
    */
    componentWillMount(){
        this.getCourseList();
    }

    getCourseList = () => {
        console.log(this.state);
        let courseList = [];
        let courseRef = fire.database().ref(`/courses/`);
        courseRef.once('value', (snapshot) =>{
            console.log(snapshot);
            snapshot.forEach((child) =>{
                let managers = child.val().managers;
                let students = child.val().students;
                let owner = child.val().owner;
                if(
                    this.validateMembership(owner, managers, students)
                ){
                    courseList.push({
                        courseId:child.key,
                        owner:child.val().owner,
                        name:child.val().name,
                        school:child.val().school,
                        title:child.val().title,
                        description:child.val().description,
                        managers:child.val().managers,
                        students:child.val().students,
                        assignments:child.val().assignments,
                    });
                }
            });
            this.setState({
                courses: courseList,
                mode: courseList.length === 0 ? 'empty' : 'full',
            });
        }).catch((error)=>{
            console.log(`error: ${error}`);
        });
    };

    validateMembership = (owner, managers, students) => {
      let user = this.state.user.email;
      if(owner === user){
        return true;
      } else if (managers && students) {
        if(managers.includes(user) || students.includes(user) || owner === user){
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    handleChipListStateChange = ( name, payload ) => {
        console.log(`${name}:  ${JSON.stringify(payload)}`);
        switch(name){
            case 'students':
                this.setState({
                    students:payload,
                });
                break;
            case 'managers':
                this.setState({
                    managers:payload,
                });
                break;
            default:
                break;
        }
    }

    addMode = () => {
        this.setState({
            mode:'adding',
        });
    };

    createCourse = (e) => {
        //commit course to database
        /* "courseId" "owner" "managers" [] "name" "school" "title" "description" "students": [], */
        //push course into state
        e.preventDefault();
        let courseRef = fire.database().ref(`/courses`);
        let course = {
            owner:this.state.owner,
            name:this.state.name,
            school:this.state.school,
            title:this.state.title,
            description:this.state.description,
            managers:this.state.managers,
            students:this.state.students,
        };
        courseRef.push(course).then(()=>{
            this.getCourseList();
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

    renderAddButton(){
        return(
            <div
              style={this.state.addButtonMode ? styles.addButtonStyleHover : styles.addButtonStyle}
              onClick={this.addMode.bind(this)}
              onMouseOver={()=>this.setState({addButtonMode:true})}
              onMouseLeave={()=>this.setState({addButtonMode:false})}
            >
                <MdAddCircle/>
                <p>Add Course</p>
            </div>
        );
    }

    editCourse = (info) => {
      this.setState({
        owner: info.owner,
        name: info.name,
        school: info.school,
        title: info.title,
        description: info.description,
        students: info.students,
        managers: info.managers,
        mode: 'editing',
      });
    }

    updateCourse = () => {
      //e.preventDefault();
      const { courseId, owner, managers, name, school, title, description, students } = this.state;
      let courseRef = fire.database().ref(`/courses/${courseId}/`);
      let course = {
          owner:owner,
          name:name,
          school:school,
          title:title,
          description:description,
          managers:managers,
          students:students,
      };
      courseRef.set(course).then(()=>{
        this.getCourseList();
      });
    }

    render() {
        const { students, managers } = this.state;
        switch(this.state.mode){
            case 'loading':
                return (
                    <div>
                        <h3>Loading......</h3>
                    </div>
                );
            case 'empty':
                return (
                    <div>
                        <h3>No Courses to Display.</h3>
                        {this.renderAddButton()}
                    </div>
                );
            case 'full':
                let CoursePack = this.state.courses.map((c) =>
                    <Course
                      courseId={c.courseId}
                      owner={c.owner}
                      managers={c.managers}
                      name={c.name}
                      school={c.school}
                      title={c.title}
                      description={c.description}
                      students={c.students}
                      user={this.state.user}
                      edit={this.editCourse.bind(this)}
                    />
                );
                return (
                    <div>
                        <div style={styles.coursePack}>
                            {CoursePack}
                        </div>
                        {this.renderAddButton()}
                    </div>
                );
            case 'adding':
                /* "courseId" "owner" "managers" [] "name" "school" "title" "description" "students": [], */
                return(
                    <div style={styles.formStyle}>
                        <h1>Add Course</h1>
                        <form onSubmit={this.state.mode === 'adding' ? this.createCourse : this.editCourse} style={styles.formStyle}>
                            <div style={styles.formSectionStyle}>
                                <label>
                                    Owner:{'  '}
                                    <input
                                        name="owner"
                                        style={styles.formInputStyle}
                                        type="text"
                                        placeholder="user@example.com"
                                        onInput={this.handleChange}
                                        value={this.state.owner}
                                    />
                                </label>
                                <label>
                                    Course Name (Short):{'  '}
                                    <input
                                        name="name"
                                        style={styles.formInputStyle}
                                        type="text"
                                        placeholder="LIT 101 00001"
                                        onInput={this.handleChange}
                                        value={this.state.name}
                                    />
                                </label>
                                <label>
                                    School{'  '}
                                    <input
                                        name="school"
                                        style={styles.formInputStyle}
                                        type="text"
                                        placeholder="Liberal Arts"
                                        onInput={this.handleChange}
                                        value={this.state.school}
                                    />
                                </label>
                                <label>
                                    Course Title (Long):{'  '}
                                    <input
                                        name="title"
                                        style={styles.formInputStyle}
                                        type="text"
                                        placeholder="Introduction to Literature"
                                        onInput={this.handleChange}
                                        value={this.state.title}
                                    />
                                </label>
                                <label>
                                    Course Description:{'  '}
                                    <input
                                        name="description"
                                        style={styles.formInputStyle}
                                        type="text"
                                        placeholder="An introduction to literature from 500 CE to Present Day"
                                        onInput={this.handleChange}
                                        value={this.state.description}
                                    />
                                </label>
                            </div>
                            <div style={styles.chipSectionStyle}>
                                <label>
                                    Course Managers({managers == null ? 0 : managers.length}):{'  '}
                                    <div style={styles.chipContainerStyle}>
                                    <ChipLister
                                        divStyle={styles.chipDivStyle}
                                        inputStyle={styles.chipInputStyle}
                                        handleChipListStateChange={this.handleChipListStateChange}
                                        emails={this.state.managers}
                                        name="managers"
                                    />
                                    </div>
                                </label>
                                <label>
                                    Course Students({students == null ? 0 : students.length}):{'  '}
                                    <div style={styles.chipContainerStyle}>
                                    <ChipLister
                                        divStyle={styles.chipDivStyle}
                                        inputStyle={styles.chipInputStyle}
                                        handleChipListStateChange={this.handleChipListStateChange}
                                        emails={this.state.students}
                                        name="students"
                                    />
                                    </div>
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
            case 'editing':
            /* "courseId" "owner" "managers" [] "name" "school" "title" "description" "students": [], */
            return(
                <div style={styles.formStyle}>
                    <h1>Add Course</h1>
                    <form onSubmit={this.state.mode === 'adding' ? this.createCourse : this.editCourse} style={styles.formStyle}>
                        <div style={styles.formSectionStyle}>
                            <label>
                                Owner:{'  '}
                                <input
                                    name="owner"
                                    style={styles.formInputStyle}
                                    type="text"
                                    placeholder="user@example.com"
                                    onInput={this.handleChange}
                                    value={this.state.owner}
                                />
                            </label>
                            <label>
                                Course Name (Short):{'  '}
                                <input
                                    name="name"
                                    style={styles.formInputStyle}
                                    type="text"
                                    placeholder="LIT 101 00001"
                                    onInput={this.handleChange}
                                    value={this.state.name}
                                />
                            </label>
                            <label>
                                School{'  '}
                                <input
                                    name="school"
                                    style={styles.formInputStyle}
                                    type="text"
                                    placeholder="Liberal Arts"
                                    onInput={this.handleChange}
                                    value={this.state.school}
                                />
                            </label>
                            <label>
                                Course Title (Long):{'  '}
                                <input
                                    name="title"
                                    style={styles.formInputStyle}
                                    type="text"
                                    placeholder="Introduction to Literature"
                                    onInput={this.handleChange}
                                    value={this.state.title}
                                />
                            </label>
                            <label>
                                Course Description:{'  '}
                                <input
                                    name="description"
                                    style={styles.formInputStyle}
                                    type="text"
                                    placeholder="An introduction to literature from 500 CE to Present Day"
                                    onInput={this.handleChange}
                                    value={this.state.description}
                                />
                            </label>
                        </div>
                        <div style={styles.chipSectionStyle}>
                            <label>
                                Course Managers({managers == null ? 0 : managers.length}):{'  '}
                                <div style={styles.chipContainerStyle}>
                                <ChipLister
                                    divStyle={styles.chipDivStyle}
                                    inputStyle={styles.chipInputStyle}
                                    handleChipListStateChange={this.handleChipListStateChange}
                                    emails={this.state.managers}
                                    name="managers"
                                />
                                </div>
                            </label>
                            <label>
                                Course Students({students == null ? 0 : students.length}):{'  '}
                                <div style={styles.chipContainerStyle}>
                                <ChipLister
                                    divStyle={styles.chipDivStyle}
                                    inputStyle={styles.chipInputStyle}
                                    handleChipListStateChange={this.handleChipListStateChange}
                                    emails={this.state.students}
                                    name="students"
                                />
                                </div>
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
        color:`${Theme.colors.darkBlue}`,
        justifyContent:'flex-start',
    },
    addButtonStyleHover:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor: `${Theme.colors.darkBlue}`,
        color:`${Theme.colors.whiteBlue}`,
        borderRadius:"5px",
        cursor: 'pointer',
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

export default Courses;
