import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import { MdModeEdit, MdLaunch } from 'react-icons/md';
import Theme from "../../data/Theme";

class Assignment extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:this.props.user,
            info:{
              assignmentId:this.props.assignmentId,
              name:this.props.name,
              description:this.props.description,
              due:this.props.due,
              status:this.props.status,
              isTemplate:this.props.isTemplate,
            },
            match:this.props.match,
            editor:this.props.editor,
            editAssignment:this.props.edit,
            editHover: false,
            launchHover: false,
        }
    }

    editMode = () => {
      this.state.editAssignment(this.state.info);
    }

    editIcon = () => {
      console.log(`Assignment:  ${this.state.editor}`);
      if(this.state.editor){
        return(
          <div
            style={this.state.editHover ? styles.iconDivStyleHover : styles.iconDivStyle}
            onClick={this.editMode}
            onMouseEnter={() => this.setState({editHover: true})}
            onMouseLeave={() => this.setState({editHover: false})}
          >
            <MdModeEdit
              style={styles.iconStyle}
            />
          </div>
        );
      }
    }

    render(){
        return(
          <div style={styles.cardStyle}>
              <h3>{this.state.info.name}</h3>
              <h6>{this.state.info.description}</h6>
              <h6>{this.state.info.due}</h6>
              <Link
                replace
                exact
                to={{
                  pathname:`/c/${this.state.match.params.cId}/Assignments/${this.state.info.assignmentId}`,
                  state:{
                    editor:this.state.editor,
                  }
                }}
              >
                <div
                  style={this.state.launchHover ? styles.launchDivStyleHover : styles.launchDivStyle}
                  onMouseEnter={() => this.setState({launchHover: true})}
                  onMouseLeave={() => this.setState({launchHover: false})}
                >
                  <MdLaunch style={styles.iconStyle} />
                </div>
              </Link>
              {this.editIcon()}
          </div>
        );
    }
}

const styles = {
    cardStyle:{
      position: 'relative',
        height:'150px',
        width:'300px',
        borderRadius:'5px',
        border:`1px solid ${Theme.colors.darkBlue}`,
        boxShadow:`2px 2px ${Theme.colors.darkBlue}`,
        display:'flex',
        flexDirection:'column',
        margin:"5px",
        padding:'5px',
        color:`${Theme.colors.darkBlue}`,
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
      left: '0px',
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
};

export default withRouter(Assignment);
