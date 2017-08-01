import React, { Component } from 'react';
import ChatMessages from './ChatMessages';
import ChatFooter from './ChatFooter';
import realtimeConnector from '../connection/realtimeConnector';
import presenceConnector from '../connection/presenceConnector';
import * as config from '../../config';

import axios from 'axios';
axios.defaults.withCredentials = true;

const INFO_MESSAGES = {
    queued: 'You are in queue, please wait...',
    alreadyConnected: 'You have already connected in another device!'
}

class Chatbody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partner: {
                gender: 'female',
                school: 'University of Athens, Greece'
            },
            me: {},
            messages: [],
            isFooterDisabled: true,
            footerInfoMessage: INFO_MESSAGES.queued
        };
    }

    disableChat = (disableOption) => {
        if (disableOption) {
            this.setState({isFooterDisabled: disableOption, footerInfoMessage: INFO_MESSAGES.queued});
        }
        else {
            this.setState({isFooterDisabled: disableOption, footerInfoMessage: ''});
        }
    }

    alreadyConnected = () => {
        this.setState({footerInfoMessage: INFO_MESSAGES.alreadyConnected});
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
                newMessage.school = this.state.me.school;
            }
            else {
                newMessage.gender = this.state.partner.gender;
                newMessage.school = this.state.partner.school;
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

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        };
    }

    componentDidMount() {
        axios.get(config.backendUrl + '/user_info')
        .then(res => {
            this.setState({
                me: {
                    gender: res.data.gender,
                    school: res.data.school + ', ' + res.data.university + ', ' + res.data.country
                }
            });
            this._presenceConnector = new presenceConnector(this.props.token, config.presenceUrl, this.joinRoom, this.alreadyConnected);
        })
        .catch(error => {
            this.context.router.history.push('/');
        })
    }

    render() {
        return (
            <div className="Chatbox">
                <ChatMessages messages={this.state.messages} partner={this.state.partner} me={this.state.me} />
                <ChatFooter
                    handleNext={this.handleNext}
                    handleNewMessage={this.handleNewMessage}
                    isFooterDisabled={this.state.isFooterDisabled}
                    footerInfoMessage={this.state.footerInfoMessage}
                />
            </div>
        );
    }
}

export default Chatbody;
