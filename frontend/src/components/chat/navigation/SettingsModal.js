import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import SettingsModalOptionsList from './SettingsModalOptionsList';
import SettingsModalContentList from './SettingsModalContentList';

class SettingsModal extends Component {
    constructor(props) {
        super(props);
        let options = ['Ενδιαφέροντα', 'Προσωπικές πληροφορίες', 'Λογαριασμός'];
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
                    <Modal.Title>Ρυθμίσεις</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <SettingsModalOptionsList
                            optionsList={this.state.optionsList}
                            active={this.state.active}
                            handleOptionSelection={this.handleOptionSelection}
                        />
                        <SettingsModalContentList
                            active={this.state.active}
                            options={this.state.optionsList}
                            infoUpdated={this.props.infoUpdated}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default SettingsModal;
