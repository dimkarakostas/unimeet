import React, { Component } from 'react';
import {Nav, NavDropdown, MenuItem} from 'react-bootstrap';

class ChatDropdownMenu extends Component {
    render() {
        return (
            <div>
                <Nav pullRight>
                    <NavDropdown eventKey={'chatMenu'} title={this.props.username} id="basic-nav-dropdown" >
                        <MenuItem eventKey={'settings'}>Settings</MenuItem>
                        <MenuItem eventKey={'help'}>Help</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={'logout'}>Log out</MenuItem>
                    </NavDropdown>
                </Nav>
            </div>
        );
    }
}

export default ChatDropdownMenu;
