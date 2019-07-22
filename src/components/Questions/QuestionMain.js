import React, { Component } from 'react';
import data from "../../data/Courses";
import { MdWarning, MdDone } from 'react-icons/md';
import {Link} from "react-router-dom";

class QuestionMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            match:this.props.match,
            info:data
                .courses[this.props.match.params.cId]
                .assignments[this.props.match.params.aId]
                .tasks[this.props.match.params.tId]
                .questions[this.props.match.params.qId]
        }
    }

    /*
    {
    "questionId":"0",
    "number":"1",
    "name":"question a",
    "description":"what kinds of details do you expect to learn from this individual that you could not otherwise know?",
    "answerType":"text",
    "status":"incomplete"
    }
    */

    renderIcon(){
        switch(this.state.info.status){
            case 'incomplete':
                return(
                    <div style={styles.iconPanel}>
                        <p>{this.state.info.status}</p>
                        <MdWarning style={styles.iconStyle} />
                    </div>
                );
            case 'complete':
                return(
                    <div style={styles.iconPanel}>
                        <p>{this.state.info.status}</p>
                        <MdDone style={styles.iconStyle} />
                    </div>
                );
            default:
                return null;
        }

    }

    render(){
        const { cId, aId, tId, qId } = this.state.match.params;
        return(
            <div>
                <div>
                    <Link exact replace to={`/Dashboard`}>Dashboard</Link>{' '}>{' '}
                    <Link exact replace to={`/Courses/${cId}`}>Course</Link>{' '}>{' '}
                    <Link exact replace to={`/c/${cId}/Assignments/${aId}`}>Assignment</Link>{' '}>{' '}
                    <Link exact replace to={`/c/${cId}/a/${aId}/Tasks/${tId}`}>Task</Link>{' '}>{' '}
                    <Link exact replace to={`/c/${cId}/a/${aId}/t/${tId}/Questions/${qId}`}>Question</Link>
                </div>
                <div>
                    <h2>{this.state.info.name}</h2>
                    <h4>{this.state.info.description}</h4>
                    {this.renderIcon()}
                </div>
            </div>
        );
    }
}

const styles = {
    iconStyle:{
        height:'25px',
        width:'25px',
    },
    iconPanel:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
    }
}

export default QuestionMain;