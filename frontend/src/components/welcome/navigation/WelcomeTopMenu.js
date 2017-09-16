import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import LoginForm from '../common/LoginForm';

class WelcomeTopMenu extends Component {
    forgot() {
        this.refs.loginform.forgot();
    }

    render() {
        return (
            <Navbar.Collapse>
                <LoginForm ref='loginform' />
            </Navbar.Collapse>
        );
    }
}

export default WelcomeTopMenu;
