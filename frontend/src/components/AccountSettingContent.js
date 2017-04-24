import React, { Component } from 'react';

class AccountSettingContent extends Component {
    isActive = () => {
        return 'modal-tab-content ' + ((this.props.active === this.props.option) ? 'active' : '');
    }

    render() {
        return (
            <div className={this.isActive()}>
                <div className="password-setting">
                    <h4>Change password</h4><hr/>
                </div>
                <div className="delete-account-setting">
                    <h4>Delete Account</h4><hr/>
                </div>
            </div>
        );
    }
}

export default AccountSettingContent;
