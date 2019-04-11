import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import { getUserQuery } from '../queries/index';
import Home from './HomePage';
import {
    loginAction
} from '../actions/index';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
        }
    }

    render() {
        const { email, password} = this.state;
        const { dispatchLogin, isAuthorized, userId } = this.props;
        console.log(`userId: ${userId}`);
        if (isAuthorized) {
            return (
                <Home userId={userId} />
            )
        }

        return (
            <div className="columns is-centered" style={{
                padding: "2%"
            }}>
                <div className="column is-half">
                    <h1 className="is-size-3 has-text-centered"> Login </h1>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <p class="help">This is a help text</p>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left">
                            <input class="input" type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field is-grouped is-grouped-centered">
                        <p class="control">
                            <button class="button is-primary" onClick={e => dispatchLogin(email, password)}>
                                Login
                            </button>
                        </p>
                        <p class="control">
                            <button class="button is-primary" onClick={e => this.props.history.push('./signup')}>
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div >
            </div >
        )
    }
}

const mapStateToProps = ({
    isAuthorized,
    userId
}) => ({
    isAuthorized,
    userId
})

const mapDispatchToProps = dispatch => ({
    dispatchLogin: (email, password) => dispatch(loginAction(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);