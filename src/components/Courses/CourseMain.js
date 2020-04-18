import React, { Component } from 'react';
//import data from '../../data/Courses.json';
import Assignments from '../Assignments/Assignments';
import Theme from '../../data/Theme.json';
import {Link} from "react-router-dom";
import fire from "../../data/Fire";

class CourseMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            mode: 'loading',
            user: this.props.user,
            match: this.props.match,
            courseId:null,
            name:null,
            owner:null,
            managers:[],
            students:[],
            school:null,
            title:null,
            description:null,
            assignments:[],
            editor:false,
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

    componentWillMount(){
        this.getCourseInfo();
    }

    getCourseInfo = () => {
        const { cId } = this.state.match.params;
        let courseRef = fire.database().ref(`/courses/${cId}/`);
        return courseRef.once('value', (snapshot) => {
            this.setState({
                courseId:snapshot.key,
                name:snapshot.val().name,
                owner:snapshot.val().owner,
                managers:snapshot.val().managers,
                students:snapshot.val().students,
                school:snapshot.val().school,
                title:snapshot.val().title,
                description:snapshot.val().description,
            });
        }).then(() => {
          const {user, owner, managers} = this.state;
          let editor = this.validateOwnership(user.email, owner, managers);
          console.log(`${user}, ${owner}, ${managers}, ${editor}`);
          this.setState({editor:editor, mode:'loaded'});
        });
    }

    validateOwnership = (user, owner, managers) => {
      if(user === owner){
        return true;
      } else if (managers.includes(user)){
        return true;
      } else {
        return false;
      }
    }

    render(){
        const { cId } = this.state.match.params;
        console.log(`CourseMain:  ${this.state.editor}`);
        switch(this.state.mode){
          case 'loading':
            return(
                <div style={styles.container}>
                    <div style={styles.courseMain}>
                        <Link replace exact to={`/Dashboard`}>Dashboard</Link>{' '}>{' '}
                        <Link replace exact to={`/Courses/${cId}`}>Course</Link>
                    </div>
                    <div styles={styles.courseMain}>
                        <h1>{this.state.name}</h1>
                        <h3>{this.state.title}</h3>
                        <p>{this.state.description}</p>
                    </div>
                    <div>
                        <h3>Loading.........</h3>
                    </div>
                </div>
            );
          case 'loaded':
            return(
                <div style={styles.container}>
                    <div style={styles.courseMain}>
                        <Link replace exact to={`/Dashboard`}>Dashboard</Link>{' '}>{' '}
                        <Link replace exact to={`/Courses/${cId}`}>Course</Link>
                    </div>
                    <div styles={styles.courseMain}>
                        <h1>{this.state.name}</h1>
                        <h3>{this.state.title}</h3>
                        <p>{this.state.description}</p>
                    </div>
                    <div>
                        <Assignments
                          user={this.state.user}
                          editor={this.state.editor}
                          courseId={cId}
                          match={this.state.match}
                          assignments={this.state.assignments}
                        />
                    </div>
                </div>
            );
          default:
            return(
              <div>
                Oopsy Tootsy, something went wrong!
              </div>
            );
        }

    }
}

const styles = {
  container:{
    color:`${Theme.colors.darkBlue}`,
    borderRadius:'5px',
  },
  courseMain:{
    color:`${Theme.colors.darkBlue}`,
    borderRadius:'5px',
  }
}

export default CourseMain;
