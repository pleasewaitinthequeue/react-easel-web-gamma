import React, { Component } from 'react';
import Assignment from './Assignment';

class Assignments extends Component{
    constructor(props){
        super(props);
        this.state = {
            courseId: this.props.courseId,
            assignments:this.props.assignments,
            match: this.props.match,
        }
    }


    render(){

        let AssignmentPack = this.state.assignments.map((a) =>
            <Assignment
                assignmentId={a.assignmentId}
                name={a.name}
                description={a.description}
                due={a.due}
                status={a.status}
                isTemplate={a.isTemplate}
                match={this.state.match}
            />
        );
        return(
            <div>
                {AssignmentPack}
            </div>
        );

    }
}

export default Assignments;