import React, { Component } from 'react';
import './ChipLister.css';
import { MdRemoveCircle } from 'react-icons/md';

/*
Andreas Remdt.  How to Create Email Chips in Pure React.  Free Code Camp.  Date of Information:  18 APRIL 2019
https://www.freecodecamp.org/news/how-to-create-email-chips-in-pure-react-ad1cc3ecea16/
 */

class ChipLister extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:this.props.name,
            regExp:/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g,
            divStyle:this.props.divStyle,
            inputStyle:this.props.inputStyle,
            value:'',
            emails:this.props.emails,
            error:null,
        }
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
            error: null,
        });
    };

    handleKeyDown = (e) => {
        if (['Enter', 'Tab', ','].includes(e.key)) {
            e.preventDefault();
            console.log(this.state.value);

            let email = this.state.value.trim();

            if (email && this.isValid(email)) {
                this.setState({
                    emails: [...this.state.emails, email],
                    value: ''
                });
            }
        }
    };

    handleDelete = (toBeRemoved) => {
        this.setState({
            emails: this.state.emails.filter(email => email !== toBeRemoved)
        });

    };

    handlePaste = (e) => {
        e.preventDefault();

        let paste = e.clipboardData.getData('text');
        let emails = paste.match(this.state.regExp);

        if (emails) {
            let toBeAdded = emails.filter(email => !this.isInList(email));

            this.setState({
                emails: [...this.state.emails, ...toBeAdded]
            });
        }
    };

    isValid(email) {
        let error = null;

        if (!this.isEmail(email)) {
            error = `${email} is not a valid email address.`;
        }

        if (this.isInList(email)) {
            error = `${email} has already been added.`;
        }

        if (error) {
            this.setState({ error });

            return false;
        }

        return true;
    }

    isEmail(email) {
        return this.state.regExp.test(email);
    }

    isInList(email) {
        if(this.state.emails != []){
            return this.state.emails.includes(email);
        }else{
            return false;
        }
    }

    componentWillUpdate(){
        if(this.state.emails != this.props.emails){
            this.props.handleChipListStateChange(this.state.name,this.state.emails);
        }
    }

    render(){
        return(
            <React.Fragment>
                <div style={this.state.divStyle}>
                {this.state.emails.map(email => (
                    <div key={email}>
                        {email}
                        <MdRemoveCircle onClick={() =>  this.handleDelete(email)}/>
                    </div>
                ))}
                </div>

                <input
                    style={this.state.inputStyle}
                    className={'input' + (this.state.error && ' has-error')}
                    placeholder="Type or paste email addresses and press `Enter`"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    onPaste={this.handlePaste}
                />
            </React.Fragment>
        );
    }
}

export default ChipLister;