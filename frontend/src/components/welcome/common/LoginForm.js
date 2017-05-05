import React, { Component } from 'react';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import ForgotPasswordModal from './ForgotPasswordModal';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isModalOpen: false,
            isLoginButtonLoading: false
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
        this.setState({isLoginButtonLoading: true});
        //TODO: Login request to backend
        setTimeout(() => {
            this.context.router.history.push('/chat');
        }, 2000);
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
                        <a onClick={this.showModal}><div className="welcome-forgot-password">Forgot password?</div></a>
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
