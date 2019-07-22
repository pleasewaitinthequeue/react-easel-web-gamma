import React, { Component } from 'react';
import fire from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {Button} from 'reactstrap';
import {Redirect, withRouter} from 'react-router';



class LogIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSignedIn: false,
            user: null,
        }
    }

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            fire.auth.GoogleAuthProvider.PROVIDER_ID,
            fire.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    };

    componentDidMount(){
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    isSignedIn: true,
                    user: user,
                });
                fire.database().ref(`/users/${user.uid}`).update({
                    email:user.email,
                    name:user.displayName,
                    image:user.photoURL,
                    isAnonymous:user.isAnonymous,
                    providerId:user.providerId,
                }).then(()=>{

                }).catch((error)=>{
                   console.log(`error: ${error}`);
                });
            }else{
                this.setState({
                    isSignedIn: !!user,
                    user: null,
                });
            }

        });
    }

    handleSignOut(event){
        event.preventDefault();
        fire.auth().signOut().then(()=> {
            this.setState({
                isSignedIn: false,
                user: null,
            });
            this.props.history.push("/");
        });
    }



    render() {
        return (
            <div className="App">
                {this.state.isSignedIn ? (
                    <span>
                        <div>
                            <h1>Welcome {fire.auth().currentUser.displayName}</h1>
                            <Button onClick={this.handleSignOut}>Sign out!</Button>
                        </div>
                        <Redirect to="/Dashboard"/>

                    </span>
                ) : (
                    <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={fire.auth()}
                    />
                )}
            </div>
        )
    }
}

export default withRouter(LogIn);
