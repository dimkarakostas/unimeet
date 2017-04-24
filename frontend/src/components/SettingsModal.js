import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import SettingsModalOptionsList from './SettingsModalOptionsList';

class SettingsModal extends Component {
    constructor(props) {
        super(props);
        let options = ['Interested in'];
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
                        <SettingsModalOptionsList optionsList={this.state.optionsList} active={this.state.active} handleOptionSelection={this.handleOptionSelection} />
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default SettingsModal;
