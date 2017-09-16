import React, { Component } from 'react';
import ChatMessages from './ChatMessages';
import ChatFooter from './ChatFooter';
import realtimeConnector from '../connection/realtimeConnector';
import presenceConnector from '../connection/presenceConnector';
import * as config from '../../config';
import QueueMessage from './QueueMessage';
import Sound from 'react-sound';

import axios from 'axios';
axios.defaults.withCredentials = true;

const INFO_MESSAGES = {
    queued: 'Είσαι στην ουρά...',
    alreadyConnected: 'Έχεις ήδη συνδεθεί!'
}

const GENDERS = {
    '0': '(Μη-ορισμένο φύλο)',
    '1': 'γυναίκα',
    '-1': 'άνδρα'
}

class Chatbody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partner: {},
            me: {},
            messages: [],
            isFooterDisabled: true,
            infoMessage: INFO_MESSAGES.queued,
            footerInfoMessage: '',
            playSound: ''
        };
    }

    disableChat = (disableOption) => {
        if (disableOption) {
            this.setState({isFooterDisabled: disableOption, infoMessage: INFO_MESSAGES.queued, footerInfoMessage: ''});
        }
        else {
            this.setState({isFooterDisabled: disableOption, infoMessage: ''});
        }
    }

    alreadyConnected = () => {
        this.setState({infoMessage: INFO_MESSAGES.alreadyConnected});
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
                if (!document.hasFocus()) {
                    this.setState({playSound: Sound.status.PLAYING});
                }
                newMessage.gender = this.state.partner.gender;
                newMessage.school = this.state.partner.school;
            }
            newMessages.push(newMessage);
            this.setState({messages: newMessages});
        }
    }

    joinRoom = (realtimeUrl, roomId, partnerInfo) => {
        if (!document.hasFocus()) {
            this.setState({playSound: Sound.status.PLAYING});
        }
        this.setState({
            partner: {
                gender: partnerInfo.gender,
                school: partnerInfo.school + ', ' + partnerInfo.university,
            },
            footerInfoMessage: 'Έχεις συνδεθεί με ' + GENDERS[partnerInfo.gender] + ' από ' + partnerInfo.school + ', ' + partnerInfo.university
        });
        axios.get(config.backendUrl + '/user_info')
        .then(res => {
            this.setState({
                me: {
                    gender: res.data.gender,
                    school: res.data.school + ', ' + res.data.university
                }
            });
            this._realtimeConnector = new realtimeConnector(this.props.token, realtimeUrl, this.handleNewMessage, this.handleNext, this.disableChat);
            this._realtimeConnector.joinRoom(roomId);
            this._presenceConnector.disconnect();
        })
        .catch(error => {
            console.log(error);
        })
    }

    componentDidMount() {
        this._presenceConnector = new presenceConnector(this.props.token, config.presenceUrl, this.joinRoom, this.alreadyConnected);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.infoUpdate !== nextProps.infoUpdate) {
            if (this._presenceConnector.isConnected) {
                this._presenceConnector.disconnect();
                this._presenceConnector = new presenceConnector(this.props.token, config.presenceUrl, this.joinRoom, this.alreadyConnected);
            }
        }
    }

    render() {
        return (
            <div className="Chatbox">
                <ChatMessages messages={this.state.messages} partner={this.state.partner} me={this.state.me} />
                <ChatFooter
                    handleNext={this.handleNext}
                    handleNewMessage={this.handleNewMessage}
                    footerInfoMessage={this.state.footerInfoMessage}
                    isFooterDisabled={this.state.isFooterDisabled}
                />
                <Sound
                    url="ring.mp3"
                    playStatus={this.state.playSound}
                />
                { this.state.infoMessage !== '' ?
                    <QueueMessage infoMessage={this.state.infoMessage} />
                : null }
            </div>
        );
    }
}

export default Chatbody;
