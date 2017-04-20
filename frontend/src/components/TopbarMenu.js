import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import LoginForm from './LoginForm';

class Topbar extends Component {
    render() {
        return (
            <div className="Contact">
            {this.props.page === 'welcome' ?
                <Navbar.Collapse>
                    <LoginForm />
                </Navbar.Collapse> :
            (this.props.page === 'contact') ?
                null :
                null}
            </div>
        );
    }
}

export default Topbar;
