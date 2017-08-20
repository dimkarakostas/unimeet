import React, { Component } from 'react';
import {Modal, Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import * as config from '../../config';

import axios from 'axios';
axios.defaults.withCredentials = true;

class ForgotPasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailPasswordReset: '',
            isForgotPasswordButtonLoading: false,
            isPasswordResetMailSent: false,
            resetMessage: ''
        };
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
        this.setState({isForgotPasswordButtonLoading: true});

        axios.post(config.backendUrl + '/forgot_password', {email: this.state.emailPasswordReset})
        .then(res => {
            this.setState({
                isForgotPasswordButtonLoading: false,
                isPasswordResetMailSent: true,
                resetMessage: 'Έλεγξε το email σου για πληροφορίες ώστε να ανακτήσεις τον κωδικό.'
            });
        })
        .catch(error => {
            this.setState({
                isForgotPasswordButtonLoading: false,
                isPasswordResetMailSent: true,
                resetMessage: 'Κάτι πήγε στραβά. Παρακαλώ προσπάθησε ξανά.'
            });
            console.log(error);
        })
    }

    render() {
        return (
            <Modal show={this.props.isModalOpen} onHide={this.props.hideModal} onEnter={this.onModalEnter} >
                <Modal.Header closeButton>
                    <Modal.Title>Ανάκτηση κωδικού</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.isPasswordResetMailSent ?
                        <p>{this.state.resetMessage}</p> :
                        <div>
                            <p>Δώσε τη διεύθυνση email με την οποία έκανες εγγραφή στο Unimeet.</p>
                            <Form onSubmit={this.handlePasswordReset}>
                                <FormGroup>
                                    <FormControl
                                        type="text"
                                        placeholder="Διεύθυνση email"
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
                                    {this.state.isForgotPasswordButtonLoading? 'Στέλνουμε το email...' : 'Στείλε email'}
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
