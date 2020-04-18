import React, { Component } from 'react';
import Theme from '../../data/Theme.json';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import { MdModeEdit, MdLaunch } from 'react-icons/md';

class Course extends Component{
    constructor(props){
        super(props);
        this.state = {
            render: true,
            user: this.props.user,
            mode: 'card',
            editHover: false,
            launchHover: false,
            editCourse: this.props.edit,
            info: {
                courseId: this.props.courseId,
                owner: this.props.owner,
                managers: this.props.managers,
                name: this.props.name,
                school: this.props.school,
                title: this.props.title,
                description: this.props.description,
                students: this.props.students,
            }
        }
    }

    /*
    "courses": [
        {
            "courseId":"0",
            "owner":"jomalair@iu.edu",
            "managers":["jomalair@iu.edu"],
            "name":"MET-35600-24524",
            "school":"Mechanical Engineering Technology",
            "title":"carbon fiber basket weaving for electric automobile tires",
            "description":"students in the course will learn how to weave carbon fiber together to make futuristic automobile tires fit for an elon musk dream.",
            "students": ["jomalair@iu.edu", "annamath@iu.edu", "nfurniss@iu.edu", "drkulkar@iu.edu" ],
            "assignments": [],
            "announcements": []
        }
    */

    editMode = () => {
      this.state.editCourse(this.state.info);
    }

    validateOwnership = (user, owner, managers) => {
      console.log(user, owner, managers);
      if(user === owner){
        return true;
      } else if (managers.includes(user)){
        return true;
      } else {
        return false;
      }
    }

    editIcon = () => {
      if(this.validateOwnership(this.state.user.email, this.state.info.owner, this.state.info.managers)){
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
      switch(this.state.mode){
        case 'card':
          return(

                  <div style={styles.cardStyle}>
                      <h3>{this.state.info.name}</h3>
                      <h5>{this.state.info.title}</h5>
                      {this.editIcon()}
                      <Link replace exact to={`/Courses/${this.state.info.courseId}`}>
                        <div
                          style={this.state.launchHover ? styles.launchDivStyleHover : styles.launchDivStyle}
                          onMouseEnter={() => this.setState({launchHover: true})}
                          onMouseLeave={() => this.setState({launchHover: false})}
                        >
                          <MdLaunch style={styles.iconStyle} />
                        </div>
                      </Link>
                  </div>

          );
        default:
          return (
            <div>
            </div>
          );
      }
    }
}

const styles = {
    cardStyle:{
        position:'relative',
        height:'150px',
        width:'300px',
        border:`1px solid ${Theme.colors.darkBlue}`,
        display:'flex',
        flexDirection:'column',
        margin:'5px',
        padding:'5px',
        borderRadius:'5px',
        boxShadow:`2px 2px ${Theme.colors.darkBlue}`,
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
    formStyle: {
        display:'flex',
        flexDirection:'column',
        width: '100%',
    },
    formSectionStyle:{
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        flexDirection:'column',
        marginRight:'150px',
        width: '100%',
    },
    formInputStyle:{
        width:'400px',
        margin:'5px',
    },
    chipSectionStyle:{
        display:'flex',
        alignItems:'flex-start',
        flexDirection:'column',
        marginLeft:'0px',
        width: '100%',
    },
    chipDivStyle: {
        fontSize:'12px',
    },
    chipInputStyle: {
        width: '200px',
        margin:'5px',
    },
    chipContainerStyle:{
        display:'flex',
        flexDirection:'column',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'flex-start',
    },
}

export default withRouter(Course);
