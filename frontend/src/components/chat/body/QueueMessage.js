import React, { Component } from 'react';
import ReactLoading from 'react-loading';

class QueueMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            email: '',
            token: '',
            infoUpdate: new Date()
        };
    }

    render() {
        return (
            <div className="QueueMessage container well text-center">
                <h4>{this.props.infoMessage}</h4>
                <ReactLoading className="loading-element" type="spinningBubbles" color="#000000" />
            </div>
        );
    }
}

export default QueueMessage;
