import React, { Component } from 'react';
import ChatMessages from './ChatMessages';
import ChatFooter from './ChatFooter';
import connector from '../connection/connector';
import * as config from '../connection/config';

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
            messages: []
        };
    }

    handleNewMessage = (message, from) => {
        if (from === undefined) {
            from = 'me';
        }
        let newMessages = this.state.messages;
        let newMessage = {
            content: message,
            timestamp: new Date(),
            from: from
        };
        newMessages.push(newMessage);
        this.setState({messages: newMessages});
        if (from === 'me') {
            this._connector.broadcastMessage(message);
        }
    }

    componentDidMount() {
        this._connector = new connector(config.realtimeUrl, config.roomId, this.handleNewMessage);
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
