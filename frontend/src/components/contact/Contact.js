import React, { Component } from 'react';
import {Topbar, Footer} from '../common';
import ContactForm from './ContactForm';
import './css/contact.css';

class Contact extends Component {
    render() {
        return (
            <div className="Contact">
                <Topbar page={'contact'} />
                <ContactForm />
                <Footer />
            </div>
        );
    }
}

export default Contact;
