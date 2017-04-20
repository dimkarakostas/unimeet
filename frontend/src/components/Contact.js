import React, { Component } from 'react';
import Topbar from './Topbar';
import ContactForm from './ContactForm';
import Footer from './Footer';
import '../css/contact.css';

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
