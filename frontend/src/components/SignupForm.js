import React, { Component } from 'react';
import {Modal, Form, FormControl, FormGroup, Button} from 'react-bootstrap';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isModalOpen: false,
            isSignupButtonLoading: false
        };
    }

    hideModal = () => {
        this.setState({isModalOpen: false});
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    signupSubmit = (event) => {
        event.preventDefault();
        console.log('email: ' + this.state.email); //TODO: remove
        this.setState({isSignupButtonLoading: true});
        //TODO: Signup request to backend
        setTimeout(() => {
            this.setState({
                isSignupButtonLoading: false,
                isModalOpen: true,
                email: ''
            });
        }, 2000);
    }

    render() {
        return (
            <div>
                <Form className="navbar-form signup-form" onSubmit={this.signupSubmit}>
                    <FormGroup>
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
                </Form>
                <Modal show={this.state.isModalOpen} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Signup complete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Please check your email and follow the link we have sent you to start chatting.</p>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default SignupForm;
