import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import {WelcomeTopMenu} from '../welcome';
import {ChatTopMenu} from '../chat';
import logo from './img/unichatLogo.png';
import './styles.css';

class Topbar extends Component {
    render() {
        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">
                            <img src={logo} alt={"The Unichat logo"}/>
                            <h1> Unichat</h1>
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
                    <ChatTopMenu /> :
                    null
                }
            </Navbar>
        );
    }
}

export default Topbar;
