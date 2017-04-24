import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';

class SettingsModal extends Component {
    constructor(props) {
        super(props);
        let options = [];
        this.state = {
            optionsList: options,
            active: options[0]
        };
    }

    handleOptionSelection = (optionName) => {
        this.setState({active: optionName});
    }

    render() {
        return (
            <Modal className="chat-modal" show={this.props.isModalOpen} onHide={() => {this.props.hideModal('settings');}} >
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default SettingsModal;
