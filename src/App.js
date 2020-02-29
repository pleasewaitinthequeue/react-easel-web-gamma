import React, { Component } from 'react';
import Nav from './components/Main/Nav';
import About from './components/Public/About';
import Contact from './components/Public/Contact';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import fire from './data/Fire';
import PrivateRoute from './router/PrivateRoute';
import LogIn from './login';
import Terms from './components/Public/Terms';
import Privacy from './components/Public/Privacy';
import Footer from './components/Main/Footer';
import Profile from './components/Main/Profile';
import SignOut from './components/Main/SignOut';
import Dashboard from './components/Main/Dashboard';
import CourseMain from './components/Courses/CourseMain';
import Theme from './data/Theme.json';
import AssignmentMain from './components/Assignments/AssignmentMain';
import TaskMain from './components/Tasks/TaskMain';
import QuestionMain from './components/Questions/QuestionMain';

class App extends Component{
    state = { loading: true, authenticated: false, currentUser: null};

    componentWillMount() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    currentUser: user,
                    loading: false
                });
            } else {
                this.setState( {
                    authenticated: false,
                    currentUser: null,
                    loading: false
                });
            }
        });
    }

    handleSignOut(){
        fire.auth().signOut()
            .then(() => {
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false,
                })
            })
            .catch((error) => {
                console.log(`error:  ${error}`)
            });
    }

    render() {
        const { authenticated, loading, currentUser } = this.state;

        if  (loading) {
            return <p>Loading..</p>;
        }

        return (
            <div style={styles.containerStyle}>
                <Router>
                    <div style={styles.appStyle}>
                        <Nav  authenticated={authenticated} user={currentUser} signOut={this.handleSignOut.bind(this)}/>
                        <div style={styles.routerStyle}>
                            {/* Public Route Paths = No Authentication Required */}
                            <Route exact path='/' component={(LogIn)}/>
                            <Route exact path='/About' component={(About)}/>
                            <Route exact path='/Contact' component={(Contact)}/>
                            <Route exact path='/Login' component={(LogIn)}/>
                            <Route exact path='/Terms' component={(Terms)}/>
                            <Route exact path='/Privacy' component={(Privacy)}/>

                            <Route exact path='/SignOut' component={(SignOut)} authenticated={false} user={null}/>
                            {/* Private Route Paths = Requires Authentication */}
                            <PrivateRoute exact path='/Dashboard' component={Dashboard} authenticated={authenticated}
                                          user={currentUser}/>
                            <PrivateRoute exact path='/Profile' component={Profile} authenticated={authenticated}
                                          user={currentUser}/>
                            <PrivateRoute path='/Courses/:cId/' component={CourseMain}
                                          authenticated={authenticated} user={currentUser}/>
                            <PrivateRoute path='/c/:cId/Assignments/:aId/' component={AssignmentMain}
                                          authenticated={authenticated} user={currentUser}/>
                            <PrivateRoute path='/c/:cId/a/:aId/Tasks/:tId/' component={TaskMain}
                                          authenticated={authenticated} user={currentUser}/>
                            <PrivateRoute path='/c/:cId/a/:aId/t/:tId/Questions/:qId' component={QuestionMain}
                                          authenticated={authenticated} user={currentUser}/>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }

}

const styles = {
    containerStyle:{
        height:'100%',
        width:'100%',
        minHeight:'100%',
        position:'relative',
        zIndex:0,
        backgroundColor:`${Theme.colors.whiteBlue}`,
        margin:0,
    },
    routerStyle:{
        marginTop:'125px',
        marginBottom:'50px',
        height:'100%',
        marginLeft:'30px',
        marginRight:'30px',
        position:'relative',
        padding:'5px',
        zIndex:'0',
        backgroundColor:`${Theme.colors.whiteBlue}`,
    },
    appStyle:{
        height:'100%',
        width:'100%',
        margin:'0px',
    }
};

export default App;
