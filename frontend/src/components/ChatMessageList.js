import React, { Component } from 'react';

class ChatMessageList extends Component {
    getMessages = () => {
        return this.props.messages.map((message, index) => {
            return '';
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
