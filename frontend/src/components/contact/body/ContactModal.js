import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';

class ContactModal extends Component {
    render() {
        return (
            <Modal show={this.props.isModalOpen} onHide={this.props.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Message sent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        We have received your message and will email back to you shortly.<br />
                        Thank you for your interest!
                    </p>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ContactModal;
