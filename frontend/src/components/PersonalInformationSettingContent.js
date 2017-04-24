import React, { Component } from 'react';

class PersonalInformationSettingContent extends Component {
    isActive = () => {
        return 'modal-tab-content ' + ((this.props.active === this.props.option) ? 'active' : '');
    }

    render() {
        return (
            <div className={this.isActive()}>
                <div className="user-setting">
                    <h4>Personal information</h4><hr/>
                </div>
            </div>
        );
    }
}

export default PersonalInformationSettingContent;
