import React, { Component } from 'react';
import SignUpView from "./SignUpView";
import { withRouter } from "react-router";
import firebase from "../fire";

class SignUpContainer extends Component {

    handleSignUp = async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            // eslint-disable-next-line
            const user = await firebase.auth().createUserWithEmailAndPassword(email.value,password.value);
            this.props.history.push("/");
        } catch (error) {
            alert(error);
        }
    };


    render() {
        return <SignUpView onSubmit={this.handleSignUp}/>
    }
}

export default withRouter(SignUpContainer);
