import React, { Component } from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import ReactEmoji from 'react-emoji';

class ChatMessage extends Component {
    render() {
        let position = 'center', tooltipPosition = '';
        switch (this.props.message.from) {
            case 'me':
                [position, tooltipPosition] = ['right', 'left'];
                break;
            case 'partner':
                [position, tooltipPosition] = ['left', 'right'];
                break;
        }
        let icon = '';
        switch (this.props.message.gender) {
            case '0':
                icon = 'intersex';
                break;
            case '1':
                icon = 'venus';
                break;
            case '-1':
                icon = 'mars';
                break;
        }
        let timeMins = Math.round((((new Date() - this.props.message.timestamp) % 86400000) % 3600000) / 60000);
        let timeMessage = timeMins < 1 ? 'now' : timeMins + (timeMins === 1 ? ' min' : ' mins') + ' ago';
        const timeTooltip = (<Tooltip id="tooltip">{timeMessage}</Tooltip>);
        const uniTooltip = (<Tooltip id="tooltip">{this.props.message.school}</Tooltip>);

        return (
            <li className={position + " clearfix"}>
                {this.props.message.from !== 'unimeet' ?
                    <span className={"chat-img pull-" + position}>
                        <OverlayTrigger placement={tooltipPosition} overlay={uniTooltip}>
                            <h4><i className={"fa fa-" + icon} aria-hidden="true"></i></h4>
                        </OverlayTrigger>
                    </span>
                : null }
                <div className="chat-body clearfix">
                    {this.props.message.from !== 'unimeet' ?
                        <OverlayTrigger placement={tooltipPosition} overlay={timeTooltip}>
                            <p className="chat-message">
                                {ReactEmoji.emojify(this.props.message.content)}
                            </p>
                        </OverlayTrigger>
                    :
                        <p className="chat-message">
                            {ReactEmoji.emojify(this.props.message.content)}
                        </p>
                    }
                </div>
            </li>
        );
    }
}

export default ChatMessage;
