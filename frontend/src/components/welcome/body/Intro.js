import React, { Component } from 'react';
import SignupForm from './SignupForm';
import LoginForm from '../common/LoginForm';

class Intro extends Component {
    render() {
        return (
            <div className="intro-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="hello-message">
                                <h1>Welcome to Unimeet.</h1>
                                <h3>Unimeet is the <em>free</em>, <em>fast</em> and <em><b>secure</b></em> way to <u><b>chat anonymously</b></u> with other university students.</h3>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><i className="fa fa-envelope-o"></i> </td>
                                            <td>Sign up with your academic email</td>
                                        </tr>
                                        <tr>
                                            <td><i className="fa fa-comments-o"></i></td>
                                            <td>Start chatting</td>
                                        </tr>
                                        <tr>
                                            <td><i className="fa fa-info-circle"></i></td>
                                            <td>Choose who you are interested in</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="container form-container well text-center" id="login-form">
                                <h4>Login</h4>
                                <hr/>
                                <LoginForm />
                            </div>
                        </div>
                        <div className="col-lg-3 col-lg-offset-2 col-md-4 col-md-offset-1 col-sm-5">
                            <div className="container form-container well text-center">
                                <h4>New to Unimeet? Sign up!</h4>
                                <hr/>
                                <SignupForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Intro;
