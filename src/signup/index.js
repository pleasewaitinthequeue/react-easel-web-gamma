import React, { Component } from 'react';
import SignUpView from './SignUpView';
import { withRouter } from 'react-router';
import firebase from '../data/Fire';

class SignUpContainer extends Component {

    handleSignUp = (event) => {
        event.preventDefault();
        const {email, password} = event.target.elements;

        firebase.auth().createUserWithEmailAndPassword(email.value,password.value)
            .then(() => {
                this.props.history.push("/");
            }).catch((error) => {
                console.log(`error:  ${error}`);
        });
    }


    render() {
        return <SignUpView onSubmit={this.handleSignUp}/>
    }
}

export default withRouter(SignUpContainer);
