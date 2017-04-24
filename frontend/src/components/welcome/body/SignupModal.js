import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';

class SignupModal extends Component {
    render() {
        return (
            <Modal show={this.props.isModalOpen} onHide={this.props.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Signup complete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please check your email and follow the link we have sent you to start chatting.</p>
                </Modal.Body>
            </Modal>
        );
    }
}

export default SignupModal;
