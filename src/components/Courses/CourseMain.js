import React, { Component } from 'react';
import data from '../../data/Courses.json';
import Assignments from '../Assignments/Assignments';
import {Link} from "react-router-dom";
import fire from "../../data/Fire";

class CourseMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            match: this.props.match,
            courseId:null,
            name:null,
            owner:null,
            managers:[],
            students:[],
            school:null,
            title:null,
            description:null,
            assignments:[],
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
        this.getCourseInfo();
    }

    getCourseInfo = () => {
        const { cId } = this.state.match.params;
        let courseRef = fire.database().ref(`/courses/${cId}/`);
        return courseRef.once('value', (snapshot) => {
            console.log(`course details: ${snapshot.key} ${snapshot.val()}`);

            this.setState({
                courseId:snapshot.key,
                name:snapshot.val().name,
                owner:snapshot.val().owner,
                managers:snapshot.val().managers,
                students:snapshot.val().students,
                school:snapshot.val().school,
                title:snapshot.val().title,
                description:snapshot.val().description,
            });
        });
    };

    render(){
        const { cId } = this.state.match.params;
        return(
            <div>
                <div>
                    <Link replace exact to={`/Dashboard`}>Dashboard</Link>{' '}>{' '}
                    <Link exact replace to={`/Courses/${cId}`}>Course</Link>
                </div>
                <div>
                    <h1>{this.state.name}</h1>
                    <h3>{this.state.title}</h3>
                    <p>{this.state.description}</p>
                </div>
                <div>
                    <Assignments courseId={cId} match={this.state.match} assignments={this.state.assignments}/>
                </div>
            </div>
        );
    }
}

export default CourseMain;