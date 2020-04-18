import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Theme from '../../data/Theme.json';
import { FaFileContract, FaUserSecret } from 'react-icons/fa';

class Footer extends Component{
    render(){
        return(
            <nav>
                <div style={styles.footerStyle}>
                    <div style={styles.footerLink}>
                        <FaFileContract />{'  '}
                        <NavLink exact activeClassName="active" to={"/Terms"}>Terms of Service</NavLink>
                    </div>
                    <div style={styles.footerLink}>
                        <FaUserSecret />{'  '}
                        <NavLink exact activeClassName="active" to={"/Privacy"}>Privacy Policy</NavLink>

                    </div>
                </div>
            </nav>
        );
    }
}

const styles = {
    footerStyle:{
        position:'fixed',
        width:'100%',
        height:'50px',
        bottom:'0px',
        left:'0px',
        color:`${Theme.colors.darkBlue}`,
        borderTop:`5px solid ${Theme.colors.darkBlue}`,
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:`${Theme.colors.whiteBlue}`,
    },
    footerLink:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:'200px',
        height:'100%',
        margin:'5px',
        padding:'5px',
    }
};

export default Footer;
