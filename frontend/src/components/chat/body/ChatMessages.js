import React, { Component } from 'react';
import ChatMessageList from './ChatMessageList';

class ChatMessages extends Component {
    render() {
        return (
            <div className="ChatMessages">
                <div className="container panel-body">
                    <ChatMessageList messages={this.props.messages} />
                </div>
            </div>
        );
    }
}

export default ChatMessages;
