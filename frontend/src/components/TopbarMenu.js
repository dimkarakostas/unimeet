import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import LoginForm from './welcome/LoginForm';
import ChatDropdownMenu from './ChatDropdownMenu';

class TopbarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'el10179@mail.ntua.gr'
        };
    }

    render() {
        return (
            <div className="TopbarMenu">
                {this.props.page === 'welcome' ?
                    <Navbar.Collapse>
                        <LoginForm />
                    </Navbar.Collapse> :
                this.props.page === 'contact' ?
                    null :
                this.props.page === 'chat' ?
                    <ChatDropdownMenu username={this.state.username} /> :
                    null
                }
            </div>
        );
    }
}

export default TopbarMenu;
