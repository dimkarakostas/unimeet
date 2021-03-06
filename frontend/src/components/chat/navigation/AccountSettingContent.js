import React, { Component } from 'react';
import PasswordChangeForm from './PasswordChangeForm';
import DeleteAccountForm from './DeleteAccountForm';

class AccountSettingContent extends Component {
    isActive = () => {
        return 'modal-tab-content ' + ((this.props.active === this.props.option) ? 'active' : '');
    }

    render() {
        return (
            <div className={this.isActive()}>
                <div className="password-setting">
                    <h4>Αλλαγή κωδικού</h4><hr/>
                    <PasswordChangeForm />
                </div>
                <div className="delete-account-setting">
                    <h4>Διαγραφή λογαριασμού</h4><hr/>
                    <DeleteAccountForm />
                </div>
            </div>
        );
    }
}

export default AccountSettingContent;
