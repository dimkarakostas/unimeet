import React, { Component } from 'react';
import {Col, Form, FormControl, FormGroup, Button} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';
import * as config from '../../config';

class InterestedInSettingContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schools: [],
            interestedInSchools: this.props.interestedInSchools,
            interestedInGender: this.props.interestedInGender,
            isApplyButtonLoading: false,
            displayChangesSavedMessage: false
        };
    }

    isActive = () => {
        return 'modal-tab-content ' + ((this.props.active === this.props.option) ? 'active' : '');
    }

    handleSexChange = (event) => {
        this.setState({interestedInGender: event.target.value});
    }

    onSelect = (row, isSelected, e) => {
        var interestedInSchools = this.state.interestedInSchools;
        if (isSelected) {
            interestedInSchools.push(row.id);
        }
        else {
            interestedInSchools = interestedInSchools.filter(uniId => uniId !== row.id)
        }
        this.setState({interestedInSchools: interestedInSchools});
    }

    onSelectAll = (isSelected, rows) => {
        var interestedInSchools = [];
        if (isSelected) {
            for (var i=0; i<rows.length; i++) {
                interestedInSchools.push(rows[i].id);
            }
        }
        this.setState({interestedInSchools: interestedInSchools});
    }

    handleSettingChange = (event) => {
        event.preventDefault();
        this.setState({isApplyButtonLoading: true, displayChangesSavedMessage: false});
        axios.post(config.backendUrl + '/user_interests', {
            interestedInGender: this.state.interestedInGender,
            interestedInSchools: this.state.interestedInSchools
        })
        .then(res => {
            this.setState({
                isApplyButtonLoading: false,
                displayChangesSavedMessage: true
            });
            setTimeout(() => {
                this.setState({
                    displayChangesSavedMessage: false
                });
            }, 5000);
        })
        .catch(error => {
            console.log(error);
        })
    }

    componentDidMount() {
        axios.get(config.backendUrl + '/get_schools')
        .then(res => {
            var schools = [];
            var school = null;
            for (var i=0; i < res.data.schools.length; i++) {
                school = res.data.schools[i];
                schools.push({
                    'id': school.id,
                    'name': school.name,
                    'university': school.university + ', ' + school.country
                });
            }
            this.setState({schools: schools});
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.state.interestedInSchools,
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
                                    defaultValue={this.state.interestedInGender}
                                    onChange={this.handleSexChange}
                                >
                                    <option value="0">Whatever</option>
                                    <option value="-1">Men</option>
                                    <option value="1">Women</option>
                                </FormControl>
                            </Col>
                        </FormGroup>

                        <b>from:</b>
                        <FormGroup className="interested-universities">
                            <BootstrapTable data={this.state.schools} selectRow={selectRowProp} hover condensed>
                                <TableHeaderColumn dataField='id' isKey hidden>Id</TableHeaderColumn>
                                <TableHeaderColumn width='200' dataField='name'>School</TableHeaderColumn>
                                <TableHeaderColumn dataField='university'>University</TableHeaderColumn>
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
