import React, { Component } from 'react';
import {Form, FormGroup, FormControl, Button, Tooltip} from 'react-bootstrap';
import ForgotPasswordModal from './ForgotPasswordModal';
import axios from 'axios';
import * as config from '../../config';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isModalOpen: false,
            isLoginButtonLoading: false,
            showCredentialsInvalid: false
        };
    }

    hideModal = () => {
        this.setState({isModalOpen: false});
    }

    showModal = () => {
        this.setState({isModalOpen: true});
    }

    handleInputChange = (event) => {
        if (event.target.name === 'username') {
            this.setState({username: event.target.value});
        }
        else if (event.target.name === 'password') {
            this.setState({password: event.target.value});
        }
    }

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        };
    }

    handleLogin = (event) => {
        event.preventDefault();
        this.setState({isLoginButtonLoading: true});

        axios.post(config.backendUrl + '/login', {email: this.state.username, password: this.state.password})
        .then(res => {
            if (res.status === 200 && res.data === 'Login OK') {
                this.context.router.history.push('/chat');
            }
        })
        .catch(error => {
            if (error.response.status === 400 && error.response.data === 'Bad credentials') {
                this.setState({
                    showCredentialsInvalid: true,
                    isLoginButtonLoading: false
                });
                setTimeout(() => {
                    this.setState({showCredentialsInvalid: false});
                }, 3000);
            }
            else {
                console.log(error);
            }
        })
    }

    render() {
        return (
            <div>
                <Form className="navbar-form navbar-right" onSubmit={this.handleLogin}>
                    <FormGroup>
                        <FormControl
                            type="text"
                            placeholder="Email"
                            name="username"
                            autoFocus
                            autoComplete="off"
                            disabled={this.state.isLoginButtonLoading}
                            onChange={this.handleInputChange}
                        />
                        {this.state.showCredentialsInvalid ? <Tooltip id="tooltip" placement="bottom" className="in">Your credentials are invalid!</Tooltip> : ''}
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <FormControl
                            type="password"
                            placeholder="Password"
                            name="password"
                            disabled={this.state.isLoginButtonLoading}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup className="welcome-forgot-password">
                        <a onClick={this.showModal}><div>Forgot?</div></a>
                    </FormGroup>
                    {' '}
                    <Button
                        type="submit"
                        bsStyle="primary"
                        disabled={this.state.isLoginButtonLoading}
                        onClick={!this.state.isLoginButtonLoading? this.handleLogin : null}
                    >
                        {this.state.isLoginButtonLoading? 'Logging in...' : 'Log in'}
                    </Button>
                </Form>
                <ForgotPasswordModal isModalOpen={this.state.isModalOpen} hideModal={() => {this.hideModal()}} />
            </div>
        );
    }
}

export default LoginForm;
