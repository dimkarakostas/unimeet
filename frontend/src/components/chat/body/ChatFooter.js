import React, { Component } from 'react';
import {Form, InputGroup, FormControl, Button, Popover, OverlayTrigger} from 'react-bootstrap';
import EmojiInput from './EmojiInput';
import ReactEmoji from 'react-emoji';

class ChatFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatMessage: ''
        };
    }

    handleMessageInput = (event) => {
        this.setState({chatMessage: event.target.value});
    }

    handleEmoji = (emoji) => {
        if (!this.props.isFooterDisabled) {
            let newMessage = this.state.chatMessage;
            newMessage += emoji;
            this.setState({chatMessage: newMessage});
            this.chatMessageInput.focus();
        }
    }

    handleMessageSubmit = (event) => {
        event.preventDefault();
        if (this.state.chatMessage.replace(/\s/g, '').length) {
            this.props.handleNewMessage(this.state.chatMessage);
            this.setState({chatMessage: ''});
        }
    }

    handleKeyPress = (event) => {
        if (!this.props.isFooterDisabled && event.key === 'Escape') {
            this.props.handleNext('me');
            this.setState({chatMessage: ''});
        }
    }

    componentDidUpdate() {
        if (!this.props.isFooterDisabled) {
            this.chatMessageInput.focus();
        }
    }

    render() {
        return (
            <div className="panel-footer navbar-fixed-bottom" id="chat-footer">
                <div className="container">
                    <div className="chat-user-message">{this.props.footerInfoMessage}</div>
                    <Form onSubmit={this.handleMessageSubmit} onKeyUp={this.handleKeyPress}>
                        <InputGroup>
                            <span className="input-group-btn">
                                <a>
                                <Button
                                    bsStyle="danger"
                                    bsSize="small"
                                    id="btn-next"
                                    disabled={this.props.isFooterDisabled}
                                    onClick={this.props.handleNext}
                                >
                                    Επόμενο (Esc)
                                </Button>
                                </a>
                            </span>
                            <FormControl
                                type="text"
                                name="chat-message"
                                id="chat-message-input"
                                bsSize="small"
                                placeholder="Πες κάτι..."
                                value={this.state.chatMessage}
                                autoFocus
                                autoComplete="off"
                                onChange={this.handleMessageInput}
                                disabled={this.props.isFooterDisabled}
                                inputRef={(input) => { this.chatMessageInput = input; }}
                            />
                            <span className="input-group-btn">
                                <OverlayTrigger trigger="click" rootClose placement="top" overlay={<Popover id="popover-trigger-click-root-close" className="emoji-popover"><EmojiInput handleEmoji={this.handleEmoji}/></Popover>}>
                                    <span className="emoji-trigger">{ReactEmoji.emojify(':)')}</span>
                                </OverlayTrigger>
                                <a>
                                <Button
                                    type="submit"
                                    bsStyle="success"
                                    bsSize="small"
                                    id="btn-send"
                                    disabled={this.props.isFooterDisabled}
                                >
                                    Αποστολή (Enter)
                                </Button>
                                </a>
                            </span>
                        </InputGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default ChatFooter;
