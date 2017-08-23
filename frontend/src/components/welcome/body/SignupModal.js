import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';

class SignupModal extends Component {
    render() {
        return (
            <Modal show={this.props.isModalOpen} onHide={this.props.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Εγγραφή</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Η εγγραφή ολοκληρώθηκε! Σου έχουμε στείλει ένα email με τον κωδικό για να συνδεθείς.</p>
                </Modal.Body>
            </Modal>
        );
    }
}

export default SignupModal;
