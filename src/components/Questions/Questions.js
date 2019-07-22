import React, { Component } from 'react';
import Theme from "../../data/Theme";
import Question from "../Questions/Question";

class Questions extends Component{
    constructor(props){
        super(props);
        this.state = {
            match:this.props.match,
            info:this.props.questions,
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
        let QuestionPack = this.state.info.map((q)=>
            <Question
                questionId={q.questionId}
                number={q.number}
                name={q.name}
                description={q.description}
                answerType={q.answerType}
                status={q.status}
                match={this.state.match}
            />
        );
        return(
            <div style={styles.cardStyle}>
                <p style={styles.textStyle}>Questions</p>
                {QuestionPack}
            </div>


        );
    }
}

const styles = {
    cardStyle:{
        display:'flex',
        flexDirection:'column',
        height:'100%',
        width:'100%',
        margin:'0px',
        border:`1px solid ${Theme.colors.darkBlue}`
    },
    textStyle:{
        height:'100%',
        width:'100%',
    }
};

export default Questions;