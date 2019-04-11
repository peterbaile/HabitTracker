import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        const { email, password } = this.state;
        const { dispatchLogin, isAuthorized, userId, loginMessage } = this.props;

        if (isAuthorized) {
            return (
                <Home />
            )
        }

        return (
            <section className="hero has-background-white-bis is-fullheight">
                <div className="columns is-centered" style={{
                    paddingTop: "10%",
                }}>
                    <div className="column is-half has-text-centered">
                        <div className="box">
                            <div>
                                <img src="https://www.launchterrehaute.com/wp-content/uploads/2017/05/Calendar-Icon-e1495568287395.png" width="128" height="128" />
                            </div>
                            <br />
                            <h1 className="is-size-3"> Sign in </h1>
                            <h1 className="is-size-5"> To Continue Use HabitTracker </h1>
                            <br />
                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <input className={email === "" ? "input is-danger" : "input"} type="email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                    <p className="help">{email === "" ? "Email cannot be empty" : null}</p>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input className={password === "" ? "input is-danger" : "input"} type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                    <p className="help">{password === "" ? "Password cannot be empty" : null}</p>
                                </p>
                            </div>
                            <br />
                            <div className="field is-grouped is-grouped-centered">
                                <p className="control">
                                    <button className="button is-info disabled" disabled={email === "" || password === "" ? true : false} onClick={e => dispatchLogin(email, password)}>
                                        Login
                                    </button>
                                </p>
                                <p className="control">
                                    <button className="button is-warning" onClick={e => this.props.history.push('./signup')}>
                                        Create Account
                                    </button>
                                </p>
                            </div>
                            <div className="field">
                                <p className="help has-text-centered"> {loginMessage} </p>
                            </div>
                        </div>
                    </div >
                </div >
            </section>
        )
    }
}

const mapStateToProps = ({
    isAuthorized,
    userId,
    loginMessage,
}) => ({
    isAuthorized,
    userId,
    loginMessage,
})

const mapDispatchToProps = dispatch => ({
    dispatchLogin: (email, password) => dispatch(loginAction(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);