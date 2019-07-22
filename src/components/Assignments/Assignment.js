import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import Theme from "../../data/Theme";

class Assignment extends Component{
    constructor(props){
        super(props);
        this.state = {
            assignmentId:this.props.assignmentId,
            name:this.props.name,
            description:this.props.description,
            due:this.props.due,
            status:this.props.status,
            isTemplate:this.props.isTemplate,
            match:this.props.match,
        }
    }

    render(){
        return(
            <Link replace exact to={`/c/${this.state.match.params.cId}/Assignments/${this.state.assignmentId}`}>
                <div style={styles.cardStyle}>
                    <h3>{this.state.name}</h3>
                    <h6>{this.state.description}</h6>
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
    }
};

export default withRouter(Assignment);