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
            match:this.props.match,
            info:{
              questionId:this.props.questionId,
              number:this.props.number,
              name:this.props.name,
              description:this.props.description,
              answerType:this.props.answerType,
              status:this.props.status,
            },
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

    renderEditIcon = () => {
      if(this.state.editor){
        return(
          <div
            style={this.state.editHover ? styles.iconDivStyleHover : styles.iconDivStyle}
            onMouseEnter={() => this.setState({editHover: true})}
            onMouseLeave={() => this.setState({editHover: false})}
          >
            <MdModeEdit style={styles.iconStyle}/>
          </div>
        );
      }
    }

    render(){
        const { cId, aId, tId } = this.state.match.params;
        return(
          <div style={styles.questionStyle}>
              <h3>{this.state.info.number}{'.'}{'  '}{this.state.info.name}</h3>
              <p>{this.state.info.description} (using {this.state.info.answerType})</p>
              <Link
                replace
                exact
                to={{
                  pathname:`/c/${cId}/a/${aId}/t/${tId}/Questions/${this.state.info.questionId}`,
                  state:{
                    editor:this.state.editor,
                  }
                }}>
              <div
                style={this.state.launchHover ? styles.launchDivStyleHover : styles.launchDivStyle}
                onMouseEnter={() => this.setState({launchHover: true})}
                onMouseLeave={() => this.setState({launchHover: false})}
              >
                <MdLaunch style={styles.iconStyle} />
              </div>
              </Link>
              {this.renderEditIcon()}
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
    right: '100px',
    bottom: '0px',
    cursor: 'pointer',
  },
}

export default withRouter(Question);
