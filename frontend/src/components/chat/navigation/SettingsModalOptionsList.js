import React, { Component } from 'react';
import SettingsModalOption from './SettingsModalOption';

class SettingsModalOptionsList extends Component {
    getOptions = () => {
        return this.props.optionsList.map((option) => {
            return <SettingsModalOption key={option} option={option} active={this.props.active} handleOptionSelection={this.props.handleOptionSelection} />;
        });
    }

    render() {
        return (
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 modal-tab-menu">
                <div className="list-group">
                    {this.getOptions()}
                </div>
            </div>
        );
    }
}

export default SettingsModalOptionsList;
