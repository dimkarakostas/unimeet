import React, { Component } from 'react';
import Topbar from './Topbar';
import '../css/chat.css';

class Chat extends Component {
    render() {
        return (
            <div className="Chat">
                <Topbar page={'chat'} />
            </div>
        );
    }
}

export default Chat;
