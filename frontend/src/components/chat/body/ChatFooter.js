import React, { Component } from 'react';
import {Form, InputGroup, FormControl, Button} from 'react-bootstrap';

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

    handleMessageSubmit = (event) => {
        event.preventDefault();
        this.props.handleNewMessage(this.state.chatMessage);
        this.setState({chatMessage: ''});
    }

    handleKeyPress = (event) => {
        if (!this.props.isFooterDisabled && event.key === 'Escape') {
            this.props.handleNext();
            this.setState({chatMessage: ''});
        }
    }

    render() {
        return (
            <div className="panel-footer navbar-fixed-bottom" id="chat-footer">
                <div className="container">
                    {this.props.isFooterDisabled? <div className="chat-user-message">You are in queue, please wait...</div> : ''}
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
                                    Next (Esc)
                                </Button>
                                </a>
                            </span>
                            <FormControl
                                type="text"
                                name="chat-message"
                                id="chat-message-input"
                                bsSize="small"
                                placeholder="Say something..."
                                value={this.state.chatMessage}
                                autoFocus
                                autoComplete="off"
                                onChange={this.handleMessageInput}
                            />
                            <span className="input-group-btn">
                                <a>
                                <Button
                                    type="submit"
                                    bsStyle="success"
                                    bsSize="small"
                                    id="btn-send"
                                    disabled={this.props.isFooterDisabled}
                                >
                                    Send (Enter)
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
