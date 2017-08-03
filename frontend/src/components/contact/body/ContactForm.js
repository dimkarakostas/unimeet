import React, { Component } from 'react';
import {Form, FormControl, FormGroup, Button, Col, ControlLabel} from 'react-bootstrap';
import ContactModal from './ContactModal';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            isModalOpen: false,
            isContactButtonLoading: false
        };
    }

    hideModal = () => {
        this.setState({isModalOpen: false});
    }

    handleInputChange = (event) => {
        if (event.target.name === 'name') {
            this.setState({name: event.target.value});
        }
        else if (event.target.name === 'email') {
            this.setState({email: event.target.value});
        }
        else if (event.target.name === 'message') {
            this.setState({message: event.target.value});
        }
    }

    contactSubmit = (event) => {
        event.preventDefault();
        console.log('name: ' + this.state.name + ' email: ' + this.state.email + ' message: ' + this.state.message); //TODO: remove
        this.setState({isContactButtonLoading: true});
        //TODO: Contact request to backend
        setTimeout(() => {
            this.setState({
                name: '',
                email: '',
                message: '',
                isModalOpen: true,
                isContactButtonLoading: false
            });
        }, 2000);
    }

    render() {
        return (
            <div className="container">
                <Form horizontal className="unimeet-contact-form" onSubmit={this.contactSubmit}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                            Name
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                type="text"
                                name="name"
                                autoComplete="off"
                                placeholder="Full Name"
                                autoFocus
                                value={this.state.name}
                                disabled={this.state.isContactButtonLoading}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                            Email
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                type="text"
                                name="email"
                                placeholder="mail@example.com"
                                value={this.state.email}
                                disabled={this.state.isContactButtonLoading}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={4} smOffset={4}>
                            <FormControl
                                componentClass="textarea"
                                name="message"
                                autoComplete="off"
                                rows="8"
                                placeholder="Write something to us..."
                                value={this.state.message}
                                disabled={this.state.isContactButtonLoading}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </FormGroup>
                    <Button
                        type="submit"
                        bsStyle="primary"
                        id="btn-signup"
                        disabled={this.state.isContactButtonLoading}
                        onClick={!this.state.isContactButtonLoading? this.contactSubmit : null}
                    >
                        {this.state.isContactButtonLoading? 'Sending...' : 'Send'}
                    </Button>
                </Form>
                <ContactModal isModalOpen={this.state.isModalOpen} hideModal={this.hideModal} />
            </div>
        );
    }
}

export default ContactForm;
