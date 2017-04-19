import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <ul className="list-inline">
                                <li>
                                    <Link to="/faq">F.A.Q.</Link>
                                </li>
                                <li className="footer-menu-divider">&sdot;</li>
                                <li>
                                    <a href="./contact">Contact</a>
                                </li>
                                <li className="footer-menu-divider">&sdot;</li>
                                <li>
                                    <a href="./security">Security</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <div className="copyright text-muted text-right">© 2017 Unichat. MIT licensed, some rights reserved.</div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
