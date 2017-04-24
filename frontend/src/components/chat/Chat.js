import React, { Component } from 'react';
import {Topbar} from '../common';
import Chatbody from './body/Chatbody';
import './styles.css';

class Chat extends Component {
    render() {
        return (
            <div className="Chat">
                <Topbar page={'chat'} />
                <Chatbody />
            </div>
        );
    }
}

export default Chat;
