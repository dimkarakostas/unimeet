import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import LoginForm from './LoginForm';

class Topbar extends Component {
    render() {
        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Unichat</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <LoginForm />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Topbar;
