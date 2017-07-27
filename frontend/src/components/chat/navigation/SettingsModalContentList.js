import React, { Component } from 'react';
import InterestedInSettingContent from './InterestedInSettingContent';
import PersonalInformationSettingContent from './PersonalInformationSettingContent';
import AccountSettingContent from './AccountSettingContent';
import * as config from '../../config';

import axios from 'axios';
axios.defaults.withCredentials = true;

class SettingsModalContentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: ''
        };
    }

    componentDidMount() {
        axios.get(config.backendUrl + '/user_info')
        .then(res => {
            this.setState({gender: res.data.gender});
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 modal-tab">
                <InterestedInSettingContent active={this.props.active} option={this.props.options[0]}/>
                {this.state.gender !== '' ?
                    <PersonalInformationSettingContent active={this.props.active} option={this.props.options[1]} gender={this.state.gender} />
                : ''}
                <AccountSettingContent active={this.props.active} option={this.props.options[2]} />
            </div>
        );
    }
}

export default SettingsModalContentList;
