import React, { Component } from 'react';
import SignupForm from './SignupForm';
import LoginForm from '../common/LoginForm';

class Intro extends Component {
    render() {
        return (
            <div className="intro-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-lg-offset-3 col-md-offset-3 col-sm-offset-3">
                            <div className="container form-container well text-center">
                                <h4>Μίλα ανώνυμα με άλλους φοιτητές</h4>
                                <hr/>
                                <SignupForm />
                            </div>
                            <div className="container form-container well text-center" id="login-form">
                                <h4>Σύνδεση</h4>
                                <hr/>
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Intro;
