import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import {WelcomeTopMenu} from '../welcome';
import {ChatTopMenu} from '../chat';
import logo from './img/unimeetLogo.png';
import './styles.css';

class Topbar extends Component {
    render() {
        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">
                            <img src={logo} alt={"The Unimeet logo"}/>
                        </a>
                    </Navbar.Brand>
                    {this.props.page === 'chat' ?
                        <Navbar.Toggle /> :
                        null
                    }
                </Navbar.Header>
                {this.props.page === 'welcome' ?
                    <WelcomeTopMenu /> :
                this.props.page === 'contact' ?
                    null :
                this.props.page === 'chat' ?
                    <ChatTopMenu email={this.props.email} infoUpdated={this.props.infoUpdated} /> :
                    null
                }
            </Navbar>
        );
    }
}

export default Topbar;
