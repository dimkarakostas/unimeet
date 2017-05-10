import React, { Component } from 'react';
import EmojiPicker from 'react-emoji-picker';

class EmojiInput extends Component {
    render() {
        return (
            <EmojiPicker
                className="emoji-picker"
                onSelect={this.props.handleEmoji}
                doGrabKeyPress={false}
            />
        )
    }
}

export default EmojiInput;
