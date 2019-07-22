import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import fire from '../../data/Fire';

class SignOut extends Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: this.props.authenticated,
            user: this.props.user,
        }
    }
    handleSignOut(){
        fire.auth().signOut().then(() => {
           this.setState({
               authenticated: false,
               user: null,
           });
        });
        this.history.push("/");
    }

    componentWillMount(){
        if(this.state.authenticated){
            this.handleSignOut();
        }
    }

    render(){
        if(this.state.authenticated){
            return (
                <Redirect to="/"/>
            );
        }else{
            return (
                <div><p>Signed Out!</p></div>
            );
        }

    }
}

export default withRouter(SignOut);