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
                                    <Link to="/contact">Contact</Link>
                                </li>
                                <li className="footer-menu-divider">&sdot;</li>
                                <li>
                                    <Link to="./security">Security</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <div className="copyright text-muted text-right">© 2017 Unichat. <a href="https://github.com/dimkarakostas/unichat" target="_blank">MIT licensed</a>, some rights reserved.</div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
