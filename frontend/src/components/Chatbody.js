import React, { Component } from 'react';
import ChatMessages from './ChatMessages';
import ChatFooter from './ChatFooter';

class Chatbody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partner: {
                gender: 'female',
                university: 'University of Athens, Greece'
            },
            me: {
                gender: 'undefined',
                university: 'National Technical University of Athens, Greece'
            },
            messages: [
                {from: 'partner', timestamp: new Date(), content: 'hi, how are you?',},
                {from: 'me', timestamp: new Date(), content: 'Fine, you?',},
            ]
        };
    }

    handleNewMessage = (message) => {
        let newMessages = this.state.messages;
        let newMessage = {
            content: message,
            timestamp: new Date(),
            from: 'me'
        };
        newMessages.push(newMessage);
        this.setState({messages: newMessages});
        //TODO: Message request to backend
    }

    render() {
        return (
            <div className="Chatbox">
                <ChatMessages messages={this.state.messages} partner={this.state.partner} me={this.state.me} />
                <ChatFooter handleNewMessage={this.handleNewMessage} />
            </div>
        );
    }
}

export default Chatbody;
