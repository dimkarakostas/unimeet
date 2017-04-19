import React, { Component } from 'react';
import {Form, FormControl, FormGroup, Button} from 'react-bootstrap';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    signupSubmit = (event) => {
        event.preventDefault();
        console.log('email: ' + this.state.email); //TODO: remove
        //TODO: Signup request to backend
    }

    render() {
        return (
            <div>
                <Form className="navbar-form signup-form" onSubmit={this.signupSubmit}>
                    <FormGroup>
                        <FormControl
                            type="text"
                            name="email"
                            autoComplete="off"
                            placeholder="example@uoa.gr"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        bsStyle="primary"
                        id="btn-signup"
                    >
                        Sign up
                    </Button>
                </Form>
            </div>
        );
    }
}

export default SignupForm;
