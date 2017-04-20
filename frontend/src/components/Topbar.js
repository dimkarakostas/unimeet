import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import TopbarMenu from './TopbarMenu';

class Topbar extends Component {
    render() {
        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Unichat</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <TopbarMenu page={this.props.page} />
            </Navbar>
        );
    }
}

export default Topbar;
