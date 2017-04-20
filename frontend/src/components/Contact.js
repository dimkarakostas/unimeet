import React, { Component } from 'react';
import Topbar from './Topbar';
import Footer from './Footer';
import '../css/contact.css';

class Contact extends Component {
    render() {
        return (
            <div className="Contact">
                <Topbar page={'contact'} />
                <Footer />
            </div>
        );
    }
}

export default Contact;
