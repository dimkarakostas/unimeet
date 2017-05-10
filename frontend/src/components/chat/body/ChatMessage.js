import React, { Component } from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import ReactEmoji from 'react-emoji';

class ChatMessage extends Component {
    render() {
        let position = this.props.message.from === 'me' ? 'right' : 'left';
        let tooltipPosition = this.props.message.from === 'me' ? 'left' : 'right';
        let icon = this.props.message.gender === 'undefined' ? 'genderless' : this.props.message.gender === 'female' ? 'venus' : 'mars';
        let timeMins = Math.round((((new Date() - this.props.message.timestamp) % 86400000) % 3600000) / 60000);
        let timeMessage = timeMins < 1 ? 'now' : timeMins + (timeMins === 1 ? ' min' : ' mins') + ' ago';
        const timeTooltip = (<Tooltip id="tooltip">{timeMessage}</Tooltip>);
        const uniTooltip = (<Tooltip id="tooltip">{this.props.message.university}</Tooltip>);

        return (
            <li className={position + " clearfix"}>
                <span className={"chat-img pull-" + position}>
                    <OverlayTrigger placement={tooltipPosition} overlay={uniTooltip}>
                        <h4><i className={"fa fa-" + icon} aria-hidden="true"></i></h4>
                    </OverlayTrigger>
                </span>
                <div className="chat-body clearfix">
                    <OverlayTrigger placement={tooltipPosition} overlay={timeTooltip}>
                        <p className="chat-message">
                            {ReactEmoji.emojify(this.props.message.content)}
                        </p>
                    </OverlayTrigger>
                </div>
            </li>
        );
    }
}

export default ChatMessage;
