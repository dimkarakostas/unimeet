import React, { Component } from 'react';
import {Topbar, Footer} from '../common';
import Intro from './body/Intro';
import './styles.css';
import * as config from '../config';

import axios from 'axios';
axios.defaults.withCredentials = true;

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedOut: false
        };
    }

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        };
    }

    componentDidMount = () => {
        axios.get(config.backendUrl + '/is_user_logged_in')
        .then(res => {
            this.context.router.history.push('/chat');
        })
        .catch(error => {
            this.setState({isLoggedOut: true});
        })
    }

    render() {
        return (
            <div className="Welcome">
                {this.state.isLoggedOut ?
                    <div>
                        <Topbar page={'welcome'} />
                        <Intro />
                        <Footer />
                    </div>
                : ''}
            </div>
        );
    }
}

export default Welcome;
