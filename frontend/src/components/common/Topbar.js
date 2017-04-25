import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import {WelcomeTopMenu} from '../welcome';
import {ChatTopMenu} from '../chat';

class Topbar extends Component {
    render() {
        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Unichat</a>
                    </Navbar.Brand>
                </Navbar.Header>
                {this.props.page === 'welcome' ?
                    <WelcomeTopMenu /> :
                this.props.page === 'contact' ?
                    null :
                this.props.page === 'chat' ?
                    <ChatTopMenu /> :
                    null
                }
            </Navbar>
        );
    }
}

export default Topbar;
