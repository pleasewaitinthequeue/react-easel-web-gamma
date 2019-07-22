import React, { Component } from 'react';
import data from "../../data/Courses";
import Tasks from '../Tasks/Tasks';
import {Link} from "react-router-dom";

class AssignmentMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            match:this.props.match,
            info:data.courses[this.props.match.params.cId].assignments[this.props.match.params.aId],
        }
    }

    render(){
        const { cId, aId } = this.state.match.params;
        return(
            <div>

                <div>
                    <Link exact replace to={`/Dashboard`}>Dashboard</Link>{' '}>{' '}
                    <Link exact replace to={`/Courses/${cId}`}>Course</Link>{' '}>{' '}
                    <Link exact replace to={`/c/${cId}/Assignments/${aId}`}>Assignment</Link>
                </div>
                <div>
                    <h1>{this.state.info.name}</h1>
                    <h3>{this.state.info.description}</h3>
                    <h5>{this.state.info.status}</h5>
                    <Tasks tasks={this.state.info.tasks} match={this.state.match}/>
                </div>
            </div>
        );
    }
}

export default AssignmentMain;