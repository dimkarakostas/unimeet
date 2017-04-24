import React, { Component } from 'react';
import {WelcomeTopMenu} from './welcome';
import {ChatDropdownMenu} from './chat';

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
                    <WelcomeTopMenu /> :
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
