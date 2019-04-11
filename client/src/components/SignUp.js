import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    signUpAction
} from '../actions/index';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            name: null,
            submitted: false,
            success: false,
        }
    }

    render() {
        const { email, password } = this.state;
        const {dispatchSignUp, signUpStatus, signUpMessage} = this.props;

        return (
            <div className="columns is-centered" style={{
                padding: "2%"
            }}>
                <div className="column is-half">
                    <h1 className="is-size-3 has-text-centered"> Sign Up :) </h1>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field is-grouped is-grouped-centered">
                        <p className="control">
                            <button className="button is-primary" onClick={e => this.props.history.push('./')}>
                                Back to Home
                            </button>
                        </p>
                        <p className="control">
                            <button className="button is-primary" onClick={e => dispatchSignUp(email, password)}>
                                Sign Up
                            </button>
                        </p>
                    </div>
                    {signUpStatus && <p className="help has-text-centered"> {signUpMessage} </p>}
                </div >
            </div >
        )
    }
}

const mapStateToProps = ({
    signUpStatus,
    signUpMessage
}) => ({
    signUpStatus,
    signUpMessage
})

const mapDispatchToProps = dispatch => ({
    dispatchSignUp: (email, password) => dispatch(signUpAction(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);