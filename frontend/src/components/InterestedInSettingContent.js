import React, { Component } from 'react';
import {Col, Form, FormControl, FormGroup, Button} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class InterestedInSettingContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            universities: [
                {
                    name: 'National Technical University of Athens',
                    country: 'Greece',
                    domain: 'ntua.gr'
                },
                {
                    name: 'University of Athens',
                    country: 'Greece',
                    domain: 'uoa.gr'
                },
            ],
            selectedUniversities: ['ntua.gr'],
            selectedSex: 'men',
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

    onSelect = (row, isSelected, e) => {
        var selectedUnis = this.state.selectedUniversities;
        if (isSelected) {
            selectedUnis.push(row.domain);
        }
        else {
            selectedUnis = selectedUnis.filter(uniDomain => uniDomain !== row.domain)
        }
        this.setState({selectedUniversities: selectedUnis});
    }

    onSelectAll = (isSelected, rows) => {
        var selectedUnis = [];
        if (isSelected) {
            for (var i=0; i<rows.length; i++) {
                selectedUnis.push(rows[i].domain);
            }
        }
        this.setState({selectedUniversities: selectedUnis});
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
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.state.selectedUniversities,
            onSelect: this.onSelect,
            onSelectAll: this.onSelectAll
        };
        return (
            <div className={this.isActive()}>
                <div className="interested-in-setting">
                    <h4>Interested in</h4><hr/>
                    <Form horizontal onSubmit={this.handleSettingChange}>
                        <b>I want to talk to:</b>
                        <FormGroup className="interested-sex">
                            <Col sm={4}>
                                <FormControl
                                    componentClass="select"
                                    placeholder="select"
                                    name="sex"
                                    id="interested-sex"
                                    defaultValue={this.state.selectedSex}
                                    onChange={this.handleSexChange}
                                >
                                    <option value="whatever">Whatever</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                </FormControl>
                            </Col>
                        </FormGroup>

                        <b>from:</b>
                        <FormGroup className="interested-universities">
                            <BootstrapTable data={this.state.universities} selectRow={selectRowProp} hover condensed>
                                <TableHeaderColumn width='200' dataField='name'>University</TableHeaderColumn>
                                <TableHeaderColumn dataField='country'>Country</TableHeaderColumn>
                                <TableHeaderColumn width='70' dataField='domain' isKey>Domain</TableHeaderColumn>
                            </BootstrapTable>
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

export default InterestedInSettingContent;
