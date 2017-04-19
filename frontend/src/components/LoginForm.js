import React, { Component } from 'react';
import {Modal, Form, FormGroup, FormControl, Button} from 'react-bootstrap';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        if (event.target.name === 'username') {
            this.setState({username: event.target.value});
        }
        else if (event.target.name === 'password') {
            this.setState({password: event.target.value});
        }
    }

    handleLogin = (event) => {
        event.preventDefault();
        console.log('username: ' + this.state.username + ' password: ' + this.state.password); //TODO: remove
        //TODO: Login request to backend
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
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <FormControl
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleInputChange}
                        />
                        <a><div className="forgot-password">Forgot password?</div></a>
                    </FormGroup>
                    {' '}
                    <Button
                        type="submit"
                        bsStyle="primary"
                    >
                        Log in
                    </Button>
                </Form>
            </div>
        );
    }
}

export default LoginForm;
