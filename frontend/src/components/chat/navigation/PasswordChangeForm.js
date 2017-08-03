import React, { Component } from 'react';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import * as config from '../../config';

import axios from 'axios';
axios.defaults.withCredentials = true;

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
        axios.post(config.backendUrl + '/change_password', {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            newPasswordVerification: this.state.newPasswordVerification
        })
        .then(res => {
            this.setState({
                isApplyButtonLoading: false,
                displayChangesSavedMessage: true
            });
            setTimeout(() => {
                this.setState({
                    displayChangesSavedMessage: false
                });
            }, 5000);
        })
        .catch(error => {
            console.log(error);
        })
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
                        placeholder="Παλιός κωδικός"
                        name="old-password"
                        onChange={this.handleInputChange}
                    />
                    <a onClick={this.handleForgotPassword} id="forgot-password-setting">Ξέχασες τον κωδικό?</a>
                    {this.state.displayPasswordForgotMessage ? <b>Έλεγξε το email σου για οδηγίες.</b> : null}
                </FormGroup>

                <FormGroup className="password-setting-input-field">
                    <FormControl
                        type="password"
                        placeholder="Νέος κωδικός"
                        name="new-password"
                        onChange={this.handleInputChange}
                    />
                </FormGroup>

                <FormGroup className="password-setting-input-field">
                    <FormControl
                        type="password"
                        placeholder="Επιβεβαίωση νέου κωδικού"
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
                    {this.state.isApplyButtonLoading? 'Αλλαγή...' : 'Αλλαγή'}
                </Button>
                {this.state.displayChangesSavedMessage? <b className="changes-saved-message">Ο κωδικός σου άλλαξε.</b> : null}
            </Form>
        );
    }
}

export default PasswordChangeForm;
