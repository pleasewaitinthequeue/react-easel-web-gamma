import React, { Component } from 'react';
import Courses from '../Courses/Courses';
import {Link} from "react-router-dom";
import Timer from './../common/Timer';
//import fire from '../../data/Fire';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            authenticated: this.props.authenticated,
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
        return(
            <div>
                <div>
                    <Link replace to={`/Dashboard`}>Dashboard</Link>
                </div>
                <h2>Welcome {this.state.user.displayName}</h2>
                <p>to your Course Dashboard</p>
                <div style={styles.dashboardContainer}>
                    <Courses user={this.state.user} />
                </div>
                <div>
                  <Timer />
                </div>
            </div>
        );
    }
}

const styles = {
    dashboardContainer:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'flex-start',
    }
};

export default Dashboard;
