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
                                    <a href="http://unimeet.gr/faq">Συχνές ερωτήσεις</a>
                                </li>
                                <li className="footer-menu-divider">&sdot;</li>
                                <li>
                                    <Link to="/contact">Επικοινωνία</Link>
                                </li>
                                <li className="footer-menu-divider">&sdot;</li>
                                <li>
                                    <Link to="./security">Ασφάλεια</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <div className="copyright text-muted text-right">© 2017 Unimeet. <a href="https://github.com/dimkarakostas/unimeet" target="_blank">MIT licensed</a>, some rights reserved.</div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
