import React, { Component } from 'react';
import {Form, FormControl, FormGroup, Button} from 'react-bootstrap';
import SignupModal from './SignupModal';
import * as config from '../../config';
import {Link} from 'react-router-dom';

import axios from 'axios';
axios.defaults.withCredentials = true;

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isModalOpen: false,
            isSignupButtonLoading: false,
            invalidEmail: false
        };
    }

    hideModal = () => {
        this.setState({isModalOpen: false});
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
        if (this.state.invalidEmail) {
            this.setState({invalidEmail: false});
        }
    }

    signupSubmit = (event) => {
        event.preventDefault();
        this.setState({isSignupButtonLoading: true});

        axios.post(config.backendUrl + '/signup', {email: this.state.email})
        .then(res => {
            if (res.status === 200 && res.data === 'Signup OK') {
                this.setState({
                    isSignupButtonLoading: false,
                    isModalOpen: true,
                    email: ''
                });
            }
        })
        .catch(error => {
            if (error.response.status === 400 && error.response.data === 'Invalid univesity email') {
                console.log('Invalid mail');
                this.setState({
                    isSignupButtonLoading: false,
                    invalidEmail: true
                });
            }
            else {
                console.log(error);
            }
        })
    }

    render() {
        return (
            <div>
                <Form className="navbar-form signup-form" onSubmit={this.signupSubmit}>
                    <FormGroup
                        validationState={this.state.invalidEmail ? "warning" : null}
                        ref={(input) => { this.signupForm = input; }}
                    >
                        <FormControl
                            type="text"
                            name="email"
                            autoComplete="off"
                            placeholder="example@uoa.gr"
                            value={this.state.email}
                            disabled={this.state.isSignupButtonLoading}
                            onChange={this.handleEmailChange}
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        bsStyle="primary"
                        id="btn-signup"
                        disabled={this.state.isSignupButtonLoading}
                        onClick={!this.state.isSignupButtonLoading? this.signupSubmit : null}
                    >
                        {this.state.isSignupButtonLoading? 'Signing up...' : 'Sign up'}
                    </Button>
                    {this.state.invalidEmail ?
                        <div className="email-error">
                            <b>Υπήρξε κάποιο πρόβλημα! Χρησιμοποίησες ένα <Link to="/faq" target="_blank">έγκυρο ακαδημαϊκό</Link> email?</b>
                        </div>
                    : null}
                </Form>
                <SignupModal isModalOpen={this.state.isModalOpen} hideModal={this.hideModal} />
            </div>
        );
    }
}

export default SignupForm;
