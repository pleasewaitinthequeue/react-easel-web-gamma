import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Question extends Component{
    constructor(props){
        super(props);
        this.state = {
            questionId:this.props.questionId,
            number:this.props.number,
            name:this.props.name,
            description:this.props.description,
            answerType:this.props.answerType,
            status:this.props.status,
            match:this.props.match,
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

    render(){
        const { cId, aId, tId } = this.state.match.params;
        return(
            <Link replace exact
                  to={`/c/${cId}/a/${aId}/t/${tId}/Questions/${this.state.questionId}`}
            >
                <div>
                    <h3>{this.state.name}</h3>
                    <p>{this.state.description}</p>
                </div>
            </Link>
        );
    }
}
export default Question;