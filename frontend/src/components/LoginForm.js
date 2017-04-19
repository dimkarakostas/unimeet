import React, { Component } from 'react';
import {Modal, Form, FormGroup, FormControl, Button} from 'react-bootstrap';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isModalOpen: false,
            emailPasswordReset: '',
            isForgotPasswordButtonLoading: false,
            isPasswordResetMailSent: false,
            isLoginButtonLoading: false
        };
    }

    hideModal = () => {
        this.setState({
            isModalOpen: false,
            isForgotPasswordButtonLoading: false,
            isPasswordResetMailSent: false
        });
    }

    showModal = () => {
        this.setState({isModalOpen: true});
    }

    handleInputChange = (event) => {
        if (event.target.name === 'username') {
            this.setState({username: event.target.value});
        }
        else if (event.target.name === 'password') {
            this.setState({password: event.target.value});
        }
        else if (event.target.name === 'email-password-reset') {
            this.setState({emailPasswordReset: event.target.value});
            console.log(this.state.emailPasswordReset); //TODO: remove
        }
    }

    handleLogin = (event) => {
        event.preventDefault();
        console.log('username: ' + this.state.username + ' password: ' + this.state.password); //TODO: remove
        this.setState({isLoginButtonLoading: true});
        //TODO: Login request to backend
    }

    handlePasswordReset = (event) => {
        event.preventDefault();
        console.log('password-reset-mail: ' + this.state.emailPasswordReset); //TODO: remove
        this.setState({isForgotPasswordButtonLoading: true});
        //TODO: Reset password request to backend
        setTimeout(() => {
            this.setState({isForgotPasswordButtonLoading: false, isPasswordResetMailSent: true});
        }, 2000);
    }

    render() {
        return (
            <div>
                <Form className="navbar-form navbar-right" onSubmit={this.handleLogin}>
                    <FormGroup>
                        <FormControl
                            type="text"
                            placeholder="Email"
                            name="username"
                            autoFocus
                            autoComplete="off"
                            disabled={this.state.isLoginButtonLoading}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <FormControl
                            type="password"
                            placeholder="Password"
                            name="password"
                            disabled={this.state.isLoginButtonLoading}
                            onChange={this.handleInputChange}
                        />
                        <a onClick={this.showModal}><div className="forgot-password">Forgot password?</div></a>
                    </FormGroup>
                    {' '}
                    <Button
                        type="submit"
                        bsStyle="primary"
                        disabled={this.state.isLoginButtonLoading}
                        onClick={!this.state.isLoginButtonLoading? this.handleLogin : null}
                    >
                        {this.state.isLoginButtonLoading? 'Logging in...' : 'Log in'}
                    </Button>
                </Form>
                <Modal show={this.state.isModalOpen} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forgot password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.isPasswordResetMailSent ?
                            <p>Please check your email and follow the link we have sent you to reset your password.</p> :
                            <div>
                                <p>Enter your email address and we will send you a link to reset your password.</p>
                                <Form onSubmit={this.handlePasswordReset}>
                                    <FormGroup>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter your email address"
                                            name="email-password-reset"
                                            autoComplete="off"
                                            disabled={this.state.isForgotPasswordButtonLoading}
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                    <Button
                                        className="center-block"
                                        type="submit"
                                        bsStyle="primary"
                                        disabled={this.state.isForgotPasswordButtonLoading}
                                        onClick={!this.state.isForgotPasswordButtonLoading? this.handlePasswordReset: null}
                                    >
                                        {this.state.isForgotPasswordButtonLoading? 'Sending mail...' : 'Send password reset email'}
                                    </Button>
                                </Form>
                            </div>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default LoginForm;
