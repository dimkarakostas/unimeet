import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class HelpModal extends Component {
    render() {
        return (
            <Modal className="chat-modal" show={this.props.isModalOpen} onHide={() => {this.props.hideModal('help');}} >
                <Modal.Header closeButton>
                    <Modal.Title>Βοήθεια</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row help-modal-row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 settings-modal-element">
                            <a href="http://unimeet.gr/faq" target="_blank" className="list-group-item text-center">
                                Συχνές ερωτήσεις
                            </a>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 settings-modal-element">
                            <Link to="/contact" target="_blank" className="list-group-item text-center">
                                Επικοινωνία
                            </Link>
                        </div>
                    </div>
                    <hr/>
                    <div className="copyright text-muted text-center">© 2017 Unimeet. <a href="https://github.com/dimkarakostas/unimeet" target="_blank">MIT licensed</a>, some rights reserved.</div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default HelpModal;
