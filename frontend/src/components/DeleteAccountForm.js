import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

class DeleteAccountForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDeleteAccountMessage: false
        };
    }

    handleDeleteAccountButton = () => {
        this.setState({displayDeleteAccountMessage: true});
    }

    handleDeleteAccountConfirmation = () => {
        console.log('Account deleted');
    }

    render() {
        return (
            <div>
                <Button
                    type="submit"
                    bsStyle="danger"
                    id="delete-account"
                    onClick={this.handleDeleteAccountButton}
                >
                    Delete account
                </Button>
                {this.state.displayDeleteAccountMessage ? <div className="delete-account-confirmation"><b>We hate to see you leaving. Are you sure?&nbsp;&nbsp;&nbsp;<a onClick={this.handleDeleteAccountConfirmation}>Yes</a></b></div> : null}
            </div>
        );
    }
}

export default DeleteAccountForm;
