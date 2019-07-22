import React, { Component } from 'react';
import data from '../../data/Courses.json';
import Assignments from '../Assignments/Assignments';
import {Link} from "react-router-dom";

class CourseMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            match: this.props.match,
            info:data.courses[this.props.match.params.cId],
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

    render(){
        const { cId } = this.state.match.params;
        return(
            <div>
                <div>
                    <Link replace exact to={`/Dashboard`}>Dashboard</Link>{' '}>{' '}
                    <Link exact replace to={`/Courses/${cId}`}>Course</Link>
                </div>
                <div>
                    <h1>{this.state.info.name}</h1>
                    <h3>{this.state.info.title}</h3>
                    <p>{this.state.info.description}</p>
                </div>
                <div>
                    <Assignments courseId={cId} match={this.state.match} assignments={this.state.info.assignments}/>
                </div>
            </div>
        );
    }
}

export default CourseMain;