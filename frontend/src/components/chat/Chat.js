import React, { Component } from 'react';
import {Topbar} from '../common';
import Chatbody from './body/Chatbody';
import './styles.css';
import * as config from '../config';

import axios from 'axios';
axios.defaults.withCredentials = true;

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            email: '',
            token: ''
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
            this.setState({
                isLoggedIn: true,
                email: res.data.email,
                token: res.data.token
            });
        })
        .catch(error => {
            this.context.router.history.push('/');
        })
    }

    render() {
        return (
            <div className="Chat">
                {this.state.isLoggedIn ?
                    <div>
                        <Topbar page={'chat'} />
                        <Chatbody />
                    </div>
                : ''}
            </div>
        );
    }
}

export default Chat;
