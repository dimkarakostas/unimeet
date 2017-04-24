import React, { Component } from 'react';
import InterestedInSettingContent from './InterestedInSettingContent';
import PersonalInformationSettingContent from './PersonalInformationSettingContent';

class SettingsModalContentList extends Component {
    render() {
        return (
            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 modal-tab">
                <InterestedInSettingContent active={this.props.active} option={this.props.options[0]}/>
                <PersonalInformationSettingContent active={this.props.active} option={this.props.options[1]} />
            </div>
        );
    }
}

export default SettingsModalContentList;
