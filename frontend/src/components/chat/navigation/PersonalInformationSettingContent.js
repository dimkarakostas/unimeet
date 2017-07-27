import React, { Component } from 'react';
import {Col, Form, FormControl, FormGroup, Button} from 'react-bootstrap';

class PersonalInformationSettingContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSex: '0',
            isApplyButtonLoading: false,
            displayChangesSavedMessage: false
        };
    }

    isActive = () => {
        return 'modal-tab-content ' + ((this.props.active === this.props.option) ? 'active' : '');
    }

    handleSexChange = (event) => {
        this.setState({selectedSex: event.target.value});
    }

    handleSettingChange = (event) => {
        event.preventDefault();
        this.setState({isApplyButtonLoading: true, displayChangesSavedMessage: false});
        setTimeout(() => {
            this.setState({
                isApplyButtonLoading: false,
                displayChangesSavedMessage: true
            });
        }, 2000);
        //TODO: Setting change request to backend IF NECESSARY
        setTimeout(() => {
            this.setState({
                displayChangesSavedMessage: false
            });
        }, 5000);
    }

    render() {
        return (
            <div className={this.isActive()}>
                <div className="user-setting">
                    <h4>Personal information</h4><hr/>
                    <Form horizontal onSubmit={this.handleSettingChange}>
                        <b>I am a:</b>
                        <FormGroup className="interested-sex">
                            <Col sm={4}>
                                <FormControl
                                    componentClass="select"
                                    placeholder="select"
                                    name="sex"
                                    id="user-sex"
                                    defaultValue={this.state.selectedSex}
                                    onChange={this.handleSexChange}
                                >
                                    <option value="0">Undefined</option>
                                    <option value="-1">Man</option>
                                    <option value="1">Woman</option>
                                </FormControl>
                            </Col>
                        </FormGroup>

                        <Button
                            type="submit"
                            bsStyle="primary"
                            disabled={this.state.isApplyButtonLoading}
                            onClick={!this.state.isApplyButtonLoading? this.handleSettingChange: null}
                        >
                            {this.state.isApplyButtonLoading? 'Applying changes...' : 'Apply'}
                        </Button>
                        {this.state.displayChangesSavedMessage? <b className="changes-saved-message">Your changes were saved.</b> : null}
                    </Form>
                </div>
            </div>
        );
    }
}

export default PersonalInformationSettingContent;
