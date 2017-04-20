import React, { Component } from 'react';
import {Modal, Form, FormGroup, FormControl, Button} from 'react-bootstrap';

class ForgotPasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailPasswordReset: '',
            isForgotPasswordButtonLoading: false,
            isPasswordResetMailSent: false
        };
    }

    hideModal = () => {
        this.props.hideModal();
    }

    onModalEnter = () => {
        this.setState({
            isForgotPasswordButtonLoading: false,
            isPasswordResetMailSent: false
        });
    }


    handleInputChange = (event) => {
        if (event.target.name === 'email-password-reset') {
            this.setState({emailPasswordReset: event.target.value});
        }
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
            <Modal show={this.props.isModalOpen} onHide={this.hideModal} onEnter={this.onModalEnter} >
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
        );
    }
}

export default ForgotPasswordModal;
