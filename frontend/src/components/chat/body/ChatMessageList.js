import React, { Component } from 'react';
import ChatMessage from './ChatMessage';
import Scroll from 'react-scroll';

class ChatMessageList extends Component {
    getMessages = () => {
        return this.props.messages.map((message, index) => {
            return <ChatMessage key={index} message={message} />;
        });
    }

    scrollToBottom = () => {
        var scroll = Scroll.animateScroll;
        scroll.scrollToBottom({duration: 0});
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
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
