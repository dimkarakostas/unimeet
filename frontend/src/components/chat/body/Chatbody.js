import React, { Component } from 'react';
import ChatMessages from './ChatMessages';
import ChatFooter from './ChatFooter';
import realtimeConnector from '../connection/realtimeConnector';
import presenceConnector from '../connection/presenceConnector';
import * as config from '../../config';

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
            messages: [],
            isFooterDisabled: true
        };
    }

    disableChat = (disableOption) => {
        this.setState({isFooterDisabled: disableOption});
    }

    handleNext = (origin) => {
        if (origin === 'me') {
            this._realtimeConnector.broadcastNext();
        }
        this._realtimeConnector.disconnect();
        this._presenceConnector.reconnect();
    }

    handleNewMessage = (message, from) => {
        if (message !== '') {
            if (from === undefined) {
                from = 'me';
            }
            let newMessages = this.state.messages;
            let newMessage = {
                content: message,
                timestamp: new Date(),
                from: from
            };
            if (from === 'me') {
                this._realtimeConnector.broadcastMessage(message);
                newMessage.gender = this.state.me.gender;
                newMessage.university = this.state.me.university;
            }
            else {
                newMessage.gender = this.state.partner.gender;
                newMessage.university = this.state.partner.university;
            }
            newMessages.push(newMessage);
            this.setState({messages: newMessages});
        }
    }

    joinRoom = (realtimeUrl, roomId) => {
        if (this._realtimeConnector === undefined) {
            this._realtimeConnector = new realtimeConnector(this.props.token, realtimeUrl, this.handleNewMessage, this.handleNext, this.disableChat);
        }
        else {
            this._realtimeConnector.reconnect();
        }
        this._realtimeConnector.joinRoom(roomId);
        this._presenceConnector.disconnect();
    }

    componentDidMount() {
        this._presenceConnector = new presenceConnector(this.props.token, config.presenceUrl, this.joinRoom);
    }

    render() {
        return (
            <div className="Chatbox">
                <ChatMessages messages={this.state.messages} partner={this.state.partner} me={this.state.me} />
                <ChatFooter handleNext={this.handleNext} handleNewMessage={this.handleNewMessage} isFooterDisabled={this.state.isFooterDisabled} />
            </div>
        );
    }
}

export default Chatbody;
