import React, { Component } from 'react';
import Theme from '../../data/Theme.json';
import { FaEyeSlash } from 'react-icons/fa';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            authenticated:this.props.authenticated,
            user:this.props.user,
        }
    }

    renderImage(){
        if(this.state.user.photoURL == null){
            return(
                <div>
                    <FaEyeSlash style={styles.imageStyle}/>
                </div>
            );
        }else{
            return(
                <img style={styles.imageStyle} src={this.state.user.photoURL} alt={this.state.user.displayName} />
            );
        }

    }

    render(){
        return(
            <div>
                <div>
                    <h3>Profile Page</h3>
                    <h1>{this.state.user.displayName}</h1>
                    <h2>{this.state.user.email}</h2>
                    {this.renderImage()}
                </div>
            </div>
        );
    }
}

const styles = {
    imageStyle:{
        height:'250px',
        width:'250px',
        border:`1px solid ${Theme.colors.blue}`,
        borderBottom:`5px solid ${Theme.colors.darkBlue}`,
    }
};

export default Profile;