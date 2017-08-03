import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';

class ContactModal extends Component {
    render() {
        return (
            <Modal show={this.props.isModalOpen} onHide={this.props.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Μήνυμα εστάλη</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Πήραμε το μήνυμά σου και θα σου απαντήσουμε μέσω email σύντομα.<br />
                        Ευχαριστούμε για το ενδιαφέρον!
                    </p>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ContactModal;
