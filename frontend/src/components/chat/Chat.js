import React, { Component } from 'react';
import Topbar from '../Topbar';
import Chatbody from './Chatbody';
import '../../css/chat.css';

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
