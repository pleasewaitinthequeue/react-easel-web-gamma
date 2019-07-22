import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../data/Fire';
import Theme from '../../data/Theme.json';
import { MdDashboard, MdInfo, MdContactMail, MdPerson } from "react-icons/md";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import EaselLogo from '../../assets/images/easel_logo.png';

class Nav extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:this.props.user,
            authenticated:this.props.authenticated,
            signOut:this.props.signOut,
        }
    }
    componentWillMount(){
        fire.auth().onAuthStateChanged((user)=>{
            if (user) {
                this.setState({
                    authenticated: true,
                    currentUser: user,
                });
            } else {
                this.setState( {
                    authenticated: false,
                    currentUser: null,
                });
            }
        });

    }

    profileLink(){
        if(this.state.authenticated){
            return(
                <div style={styles.linkStyle}>
                    <MdPerson />{'  '}
                    <Link to={"/Profile"}>
                        Profile
                    </Link>
                </div>
            );
        }else{
            return null;
        }
    }
    signOutLink(){
        if(this.state.authenticated){
            return(
                <div style={styles.linkStyle}>
                    <FaSignOutAlt />
                    <Link to="/" onClick={this.state.signOut}>Sign Out</Link>
                </div>
            );
        }else{
            return(
                <div style={styles.linkStyle}>
                    <FaSignInAlt />
                    <Link to={"/LogIn"}>
                        Sign In
                    </Link>
                </div>
            );
        }
    }

    render(){
        return(
            <nav style={styles.navStyle}>
                <div style={styles.containerStyle}>
                    <div style={styles.linkDivStyle}>
                        <img style={styles.imageStyle} src={EaselLogo} alt='Education through Application Supported Experiential Learning' />
                        <div style={styles.marqueeStyle}>
                            <Link to={"/"}><h1>EASEL</h1></Link>
                        </div>
                        <div style={styles.marqueeStyle}>
                            <p>Education through Application Supported Experiential Learning</p>
                        </div>
                    </div>
                    <div style={styles.linkDivStyle}>
                        <div style={styles.linkStyle}>
                            <MdDashboard />{'  '}
                            <Link to={"/"}>Dashboard</Link>
                        </div>
                        <div style={styles.linkStyle}>
                            <MdInfo />{'  '}
                            <Link to={"/About"}>About</Link>
                        </div>
                        <div style={styles.linkStyle}>
                            <MdContactMail />{'  '}
                            <Link  to={"/Contact"}>Contact</Link>
                        </div>
                        {this.profileLink()}
                        {this.signOutLink()}
                    </div>
                </div>
            </nav>
        );
    }
}

const styles = {
    navStyle:{
        position:'fixed',
        margin:'0px',
        top:'0px',
        left:'0px',
        height:'100px',
        width:'100%',
        backgroundColor:`${Theme.colors.whiteBlue}`,
        opacity:1,
        zIndex:1,
        borderBottom:`5px solid ${Theme.colors.darkBlue}`,
    },
    containerStyle:{
        display:'flex',
        alignItems:'stretch',
        justifyContent:'center',
        flexDirection:'row',
        width: '100%',
        height: '100px',
        margin:'0px',
        backgroundColor:`${Theme.colors.whiteBlue}`,
        opacity:1,
        zIndex:1,
    },
    marqueeStyle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        width:'100%',
        height:'100%',
        margin:'0px',
        backgroundColor:`${Theme.colors.whiteBlue}`,
        opacity:1,
        zIndex:1,
    },
    linkDivStyle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end',
        flexDirection:'row',
        width: '100%',
        height: '100%',
        margin:'0px',
        backgroundColor:`${Theme.colors.whiteBlue}`,
        opacity:1,
        zIndex:1,
    },
    linkStyle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        alignSelf:'center',
        height:'100%',
        margin:'5px',
        padding:'5px',
    },
    imageStyle:{
        height:'70px',
        width:'100px',
        border:`1px solid ${Theme.colors.darkBlue}`,
        borderBottom:`5px solid ${Theme.colors.darkBlue}`,
        margin:'5px',
    }
};

export default Nav;