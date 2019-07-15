import React, { Component } from 'react';
import fire from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {Button} from 'reactstrap';


class LogIn extends Component {
    state = { isSignedIn: false }
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

    componentDidMount = () => {
        fire.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
        });
    };



    render() {
        return (
            <div className="App">
                {this.state.isSignedIn ? (
                    <span>
            <div></div>
                        <h1>Welcome {fire.auth().currentUser.displayName}</h1>
                        <Button onClick={() => fire.auth().signOut()}>Sign out!</Button>


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

export default LogIn;
