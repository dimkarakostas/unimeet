import React, { Component } from 'react';

class SettingsModalOption extends Component {
    render() {
        return (
            <a
                className={"list-group-item text-center " + (this.props.active === this.props.option ? "active" : "")}
                onClick={() => {this.props.handleOptionSelection(this.props.option)}}
            >
                {this.props.option}
            </a>
        );
    }
}

export default SettingsModalOption;
