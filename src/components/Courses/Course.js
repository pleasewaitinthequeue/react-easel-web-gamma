import React, { Component } from 'react';
import Theme from '../../data/Theme.json';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

class Course extends Component{
    constructor(props){
        super(props);
        this.state = {
            render: true,
            user: this.props.user,
            info: {
                courseId: this.props.courseId,
                owner: this.props.owner,
                managers: this.props.managers,
                name: this.props.name,
                school: this.props.school,
                title: this.props.title,
                description: this.props.description,
                students: this.props.students,
            }
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
            <Link replace exact to={`/Courses/${this.state.info.courseId}`}>
                <div style={styles.cardStyle}>
                    <h3>{this.state.info.name}</h3>
                    <h5>{this.state.info.title}</h5>
                </div>
            </Link>
        );
    }
}

const styles = {
    cardStyle:{
        height:'150px',
        width:'300px',
        border:`1px solid ${Theme.colors.darkBlue}`,
        display:'flex',
        flexDirection:'column',
        margin:'5px',
        borderRadius:'2px',
        boxShadow:`2px 2px ${Theme.colors.darkBlue}`,
        color:`${Theme.colors.darkBlue}`,
    }
}

export default withRouter(Course);
