import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import LoginForm from '../common/LoginForm';

class WelcomeTopMenu extends Component {
    render() {
        return (
            <Navbar.Collapse>
                <LoginForm />
            </Navbar.Collapse>
        );
    }
}

export default WelcomeTopMenu;
