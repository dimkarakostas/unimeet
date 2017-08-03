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
                                <h1>Καλωσήρθες στο Unimeet.</h1>
                                <h3>Το Unimeet είναι το <em>δωρεάν</em>, <em><b>ανώνυμο</b></em> και <em><b>ασφαλές</b></em> chat για φοιτητές.</h3>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><i className="fa fa-envelope-o"></i> </td>
                                            <td>Κάνε εγγραφή με το <b>ακαδημαϊκό email</b></td>
                                        </tr>
                                        <tr>
                                            <td><i className="fa fa-comments-o"></i></td>
                                            <td>Ξεκίνα να μιλάς</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="container form-container well text-center" id="login-form">
                                <h4>Σύνδεση</h4>
                                <hr/>
                                <LoginForm />
                            </div>
                        </div>
                        <div className="col-lg-3 col-lg-offset-2 col-md-4 col-md-offset-1 col-sm-5">
                            <div className="container form-container well text-center">
                                <h4>Εγγραφή</h4>
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
