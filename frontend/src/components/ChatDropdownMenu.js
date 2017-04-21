import React, { Component } from 'react';
import {Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import HelpModal from './HelpModal';

class ChatDropdownMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHelpModalOpen: false
        };
    }

    handleMenuItem = (eventKey, event) => {
        if (eventKey === 'help') {
            this.setState({isHelpModalOpen: true});
        }
    }

    hideModal = (modalType) => {
        if (modalType === 'help') {
            this.setState({isHelpModalOpen: false});
        }
    }

    render() {
        return (
            <div>
                <Nav pullRight>
                    <NavDropdown eventKey={'chatMenu'} title={this.props.username} id="basic-nav-dropdown" onSelect={this.handleMenuItem} >
                        <MenuItem eventKey={'settings'}>Settings</MenuItem>
                        <MenuItem eventKey={'help'}>Help</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={'logout'}>Log out</MenuItem>
                    </NavDropdown>
                </Nav>
                <HelpModal isModalOpen={this.state.isHelpModalOpen} hideModal={this.hideModal} />
            </div>
        );
    }
}

export default ChatDropdownMenu;
