import React, { Component } from 'react';
import Course from './Course';
import fire from '../../data/Fire';
import { MdAddCircle } from 'react-icons/md';
//import data from '../../data/Courses.json';

class Courses extends Component{
    constructor(props){
        super(props);
        this.state = {
            courses: this.props.courses,
            mode:'loading',
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

    getCourseList(){
        let courseRef = fire.database().ref(`/courses`);
        courseRef.once('value')
            .then((snapshot) =>{
                let courseList = [];
                console.log(courseList);
                snapshot.forEach((course)=>{
                    if(course.val().students.includes(this.state.user.email)){
                        courseList.push(snapshot.val());
                    }else if(course.val().owner.includes(this.state.user.email) || course.val().managers.includes(this.state.user.email)){
                        courseList.push(snapshot.val());
                    }
                });
                if(courseList.length > 0){
                    this.setState({
                        courses: courseList,
                        mode:'full'
                    });
                }else{
                    this.setState({
                        courses: courseList,
                        mode:'empty'
                    });
                }
                console.log(`courseList: ${JSON.stringify(courseList)}`);
            }).catch((error) =>{
            console.log(`error: ${error}`);
        });
    }

    createCourse(){
        //todo - add course form
        //commit course to database
        //push course into state
        this.setState({
           mode:'adding',
        });
    }

    renderAddButton(){
        return(
            <div style={styles.addButtonStyle} onClick={this.createCourse.bind(this)}>
                <MdAddCircle/>
                <p>Add Course</p>
            </div>
        );
    }

    render() {
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
                    <Course courseId={c.courseId} owner={c.owner} managers={c.managers} name={c.name}
                            school={c.school} title={c.title} description={c.description} students={c.students}
                    />
                );
                return (
                    <div>
                        {CoursePack}
                        {this.renderAddButton()}
                    </div>
                );
            case 'adding':
                /* "courseId" "owner" "managers" [] "name" "school" "title" "description" "students": [], */
                return(
                    <div>
                        <form onSubmit={this.createCourse()} style={styles.formStyle}>
                            <label>
                                managers:<input type="text"/>
                            </label>
                            <label>
                                name:<input type="text" />
                            </label>
                        </form>
                    </div>
                );
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
    formStyle:{
        width:'400px',
    }
};

export default Courses;