import React, { Component } from 'react';
import {Topbar, Footer} from '../common';
import ContactForm from './body/ContactForm';
import './styles.css';

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
