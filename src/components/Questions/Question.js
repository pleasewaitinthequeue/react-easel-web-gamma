import React, { Component } from 'react';
import Theme from "../../data/Theme";
import { MdModeEdit, MdLaunch } from 'react-icons/md';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

class Question extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:this.props.user,
            editor:this.props.editor,
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
          <div style={styles.questionStyle}>
              <h3>{this.state.number}{'.'}{'  '}{this.state.name}</h3>
              <p>{this.state.description} (using {this.state.answerType})</p>
              <Link replace exact to={`/c/${cId}/a/${aId}/t/${tId}/Questions/${this.state.questionId}`}>
              <div style={styles.launchDivStyle}>
                <MdLaunch style={styles.iconStyle} />
              </div>
              </Link>
              <div styles={styles.iconDivStyle}>
                <MdModeEdit style={styles.iconStyle}/>
              </div>
          </div>
        );
    }
}

const styles = {
  questionStyle:{
    position:'relative',
    border:`1px solid ${Theme.colors.darkBlue}`,
    borderRadius:'5px',
    color:`${Theme.colors.darkBlue}`,
    margin:'5px',
    padding:'5px',
  },
  iconStyle:{
    fontSize:'30px',
  },
  iconDivStyle:{
    position:'absolute',
    backgroundColor: `${Theme.colors.whiteBlue}`,
    color: `${Theme.colors.darkBlue}`,
    margin: '5px',
    borderRadius: '5px',
    border: `1px solid ${Theme.colors.darkBlue}`,
    right: '0px',
    bottom: '0px',
  },
  iconDivStyleHover:{
    position:'absolute',
    backgroundColor: `${Theme.colors.darkBlue}`,
    color: `${Theme.colors.whiteBlue}`,
    margin: '5px',
    borderRadius: '5px',
    border: `1px solid ${Theme.colors.darkBlue}`,
    right: '0px',
    bottom: '0px',
    cursor: 'pointer',
  },
  launchDivStyle:{
    position:'absolute',
    backgroundColor: `${Theme.colors.whiteBlue}`,
    color: `${Theme.colors.darkBlue}`,
    margin: '5px',
    borderRadius: '5px',
    border: `1px solid ${Theme.colors.darkBlue}`,
    right: '100px',
    bottom: '0px',
  },
  launchDivStyleHover:{
    position:'absolute',
    backgroundColor: `${Theme.colors.darkBlue}`,
    color: `${Theme.colors.whiteBlue}`,
    margin: '5px',
    borderRadius: '5px',
    border: `1px solid ${Theme.colors.darkBlue}`,
    left: '0px',
    bottom: '0px',
    cursor: 'pointer',
  },
}

export default withRouter(Question);
