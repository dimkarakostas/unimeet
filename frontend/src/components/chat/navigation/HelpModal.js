import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class HelpModal extends Component {
    render() {
        return (
            <Modal className="chat-modal" show={this.props.isModalOpen} onHide={() => {this.props.hideModal('help');}} >
                <Modal.Header closeButton>
                    <Modal.Title>Help</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row help-modal-row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 settings-modal-element">
                            <Link to="/faq" target="_blank" className="list-group-item text-center">
                                F.A.Q.
                            </Link>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 settings-modal-element">
                            <Link to="/contact" target="_blank" className="list-group-item text-center">
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div className="row help-modal-row">
                        <div className="col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-6 col-sm-offset-3 col-sm-6 col-xs-offset-3 col-xs-6 settings-modal-element">
                            <Link to="/security" target="_blank" className="list-group-item text-center">
                                Security
                            </Link>
                        </div>
                    </div>
                    <hr/>
                    <div className="copyright text-muted text-center">© 2017 Unichat. <a href="https://github.com/dimkarakostas/unichat" target="_blank">MIT licensed</a>, some rights reserved.</div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default HelpModal;
