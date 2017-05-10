import React, { Component } from 'react';
import {Form, FormGroup, FormControl, Button, Tooltip} from 'react-bootstrap';
import ForgotPasswordModal from './ForgotPasswordModal';

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
        console.log('username: ' + this.state.username + ' password: ' + this.state.password); //TODO: remove
        if (this.state.username === '' && this.state.password === '') {
            this.setState({showCredentialsInvalid: true});
            setTimeout(() => {
                this.setState({showCredentialsInvalid: false});
            }, 3000);
        }
        else {
            this.setState({isLoginButtonLoading: true});
            //TODO: Login request to backend
            setTimeout(() => {
                this.context.router.history.push('/chat');
            }, 2000);
        }
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
