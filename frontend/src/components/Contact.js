import React, { Component } from 'react';
import Topbar from './Topbar';
import '../css/contact.css';

class Contact extends Component {
    render() {
        return (
            <div className="Contact">
                <Topbar page={'contact'} />
            </div>
        );
    }
}

export default Contact;
