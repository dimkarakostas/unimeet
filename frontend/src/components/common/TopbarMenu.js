import React, { Component } from 'react';
import {WelcomeTopMenu} from '../welcome';
import {ChatTopMenu} from '../chat';

class TopbarMenu extends Component {
    render() {
        return (
            <div className="TopbarMenu">
                {this.props.page === 'welcome' ?
                    <WelcomeTopMenu /> :
                this.props.page === 'contact' ?
                    null :
                this.props.page === 'chat' ?
                    <ChatTopMenu /> :
                    null
                }
            </div>
        );
    }
}

export default TopbarMenu;
