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
            assignmentId:this.props.assignmentId,
            name:this.props.name,
            description:this.props.description,
            due:this.props.due,
            status:this.props.status,
            isTemplate:this.props.isTemplate,
            match:this.props.match,
            owner:this.props.owner,
            managers:this.props.managers,
        }
    }

    validateOwnership = (owner, managers, user) => {
      console.log(`owner: ${owner}, managers: ${managers}, user: ${user}`);
      if(owner === user){
        return true;
      } else if (managers.includes(user)){
        return true;
      } else {
        return false;
      }
    }

    editIcon = () => {
      if(this.validateOwnership(this.state.owner, this.state.managers, this.state.user.email)){
        return(
          <div
            style={this.state.hover ? styles.iconDivStyleHover : styles.iconDivStyle}
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
              <h3>{this.state.name}</h3>
              <h6>{this.state.description}</h6>
              <Link replace exact to={`/c/${this.state.match.params.cId}/Assignments/${this.state.assignmentId}`}>
                <div style={styles.launchDivStyle}>
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
        borderRadius:'2px',
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
    },
};

export default withRouter(Assignment);
