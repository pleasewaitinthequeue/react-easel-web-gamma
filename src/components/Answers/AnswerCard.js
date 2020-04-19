import React, { Component } from 'react';
import Theme from "../../data/Theme";

class AnswerCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      match:this.props.match,
      answerId:this.props.answerId,
      answerer:this.props.answerer,
      answerType:this.props.answerType,
      caption:this.props.caption,
      description:this.props.description,
      title:this.props.title,
      url:this.props.url,
    }
  }

  render(){
    return(
      <div style={styles.answerCardStyle}>
        <h4>{this.state.answerer}</h4>
        <p>{this.state.description}</p>
      </div>
    );
  }
}

const styles = {
  answerCardStyle:{
    border:`1px solid ${Theme.colors.darkBlue}`,
    borderRadius:'5px',
    color:`${Theme.colors.darkBlue}`,
    margin:'5px',
    padding:'5px',
  }
}

export default AnswerCard;
