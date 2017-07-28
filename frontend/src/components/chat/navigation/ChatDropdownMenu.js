import React, { Component } from 'react';
import {Nav, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import HelpModal from './HelpModal';
import SettingsModal from './SettingsModal';
import * as config from '../../config';

import axios from 'axios';
axios.defaults.withCredentials = true;

class ChatDropdownMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.email,
            isSettingsModalOpen: false,
            isHelpModalOpen: false
        };
    }

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        };
    }

    handleMenuItem = (eventKey, event) => {
        if (eventKey === 'help') {
            this.setState({isHelpModalOpen: true});
        }
        else if (eventKey === 'settings') {
            this.setState({isSettingsModalOpen: true});
        }
        else if (eventKey === 'logout') {
            this.logout();
        }
    }

    logout = () => {
        axios.get(config.backendUrl + '/logout')
        .then(res => {
            if (res.status === 200 && res.data === 'Logout OK') {
                this.context.router.history.push('/');
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    hideModal = (modalType) => {
        if (modalType === 'help') {
            this.setState({isHelpModalOpen: false});
        }
        else if (modalType === 'settings') {
            this.setState({isSettingsModalOpen: false});
        }
    }

    render() {
        return (
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavDropdown eventKey={'chatMenu'} title={this.state.username} id="basic-nav-dropdown" onSelect={this.handleMenuItem} >
                        <MenuItem eventKey={'settings'}>Settings</MenuItem>
                        <MenuItem eventKey={'help'}>Help</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={'logout'}>Log out</MenuItem>
                    </NavDropdown>
                </Nav>
                <HelpModal isModalOpen={this.state.isHelpModalOpen} hideModal={this.hideModal} />
                <SettingsModal isModalOpen={this.state.isSettingsModalOpen} hideModal={this.hideModal} />
            </Navbar.Collapse>
        );
    }
}

export default ChatDropdownMenu;
