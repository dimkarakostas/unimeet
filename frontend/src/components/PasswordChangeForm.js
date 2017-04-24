import React, { Component } from 'react';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordVerification: '',
            isModalOpen: false,
            isApplyButtonLoading: false,
            displayChangesSavedMessage: false,
            displayPasswordForgotMessage: false
        };
    }

    handleInputChange = (event) => {
        if (event.target.name === 'old-password') {
            this.setState({oldPassword: event.target.value});
        }
        else if (event.target.name === 'new-password') {
            this.setState({newPassword: event.target.value});
        }
        else if (event.target.name === 'new-password-verification') {
            this.setState({newPasswordVerification: event.target.value});
        }
    }

    handleSettingChange = (event) => {
        event.preventDefault();
        this.setState({isApplyButtonLoading: true, displayChangesSavedMessage: false});
        setTimeout(() => {
            this.setState({
                isApplyButtonLoading: false,
                displayChangesSavedMessage: true
            });
        }, 2000);
        //TODO: Setting change request to backend IF NECESSARY
        setTimeout(() => {
            this.setState({
                displayChangesSavedMessage: false
            });
        }, 5000);
    }

    handleForgotPassword = () => {
        this.setState({displayPasswordForgotMessage: true});
        setTimeout(() => {
            this.setState({
                displayPasswordForgotMessage: false
            });
        }, 5000);
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handleSettingChange}>
                <FormGroup className="password-setting-input-field">
                    <FormControl
                        type="password"
                        placeholder="Old password"
                        name="old-password"
                        onChange={this.handleInputChange}
                    />
                    <a onClick={this.handleForgotPassword} id="forgot-password-setting">Forgot password?</a>
                    {this.state.displayPasswordForgotMessage ? <b>Check your mail for instructions.</b> : null}
                </FormGroup>

                <FormGroup className="password-setting-input-field">
                    <FormControl
                        type="password"
                        placeholder="New password"
                        name="new-password"
                        onChange={this.handleInputChange}
                    />
                </FormGroup>

                <FormGroup className="password-setting-input-field">
                    <FormControl
                        type="password"
                        placeholder="Confirm new password"
                        name="new-password-verification"
                        onChange={this.handleInputChange}
                    />
                </FormGroup>

                <Button
                    type="submit"
                    bsStyle="primary"
                    disabled={this.state.isApplyButtonLoading}
                    onClick={!this.state.isApplyButtonLoading? this.handleSettingChange: null}
                >
                    {this.state.isApplyButtonLoading? 'Applying changes...' : 'Apply'}
                </Button>
                {this.state.displayChangesSavedMessage? <b className="changes-saved-message">Your changes were saved.</b> : null}
            </Form>
        );
    }
}

export default PasswordChangeForm;
