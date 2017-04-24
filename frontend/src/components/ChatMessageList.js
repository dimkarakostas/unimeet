import React, { Component } from 'react';
import ChatMessage from './ChatMessage';

class ChatMessageList extends Component {
    getMessages = () => {
        return this.props.messages.map((message, index) => {
            return <ChatMessage key={index} message={message} person={message.from === 'me' ? this.props.me : this.props.partner} />;
        });
    }

    render() {
        return (
            <ul>
                {this.getMessages()}
            </ul>
        );
    }
}

export default ChatMessageList;
