import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import { getUserQuery } from '../queries/index';
import Home from './HomePage';
import { login } from '../actions/index';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            userId: null,
            submitted: false,
        }
    }

    render() {
        const { email, password, userId, submitted } = this.state;
        const { dispatchLogin, isAuthorized } = this.props;

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
                            <button class="button is-primary" onClick={e => this.setState({ submitted: true })}>
                                Login
                            </button>
                        </p>
                        <p class="control">
                            <button class="button is-primary" onClick={e => this.props.history.push('./signup')}>
                                Sign Up
                            </button>
                        </p>
                    </div>

                    {submitted && <Query query={getUserQuery} variables={{ email, password }}>
                        {({ loading, error, data }) => {
                            if (loading) {
                                return null;
                            }

                            if (error) {
                                console.log(error.message);
                                return null;
                            }

                            this.setState({ submitted: false });

                            data.users.map(user => {
                                this.setState({ userId: user.id, isAuthorized: true })
                                dispatchLogin();
                            });

                            return null;
                        }}
                    </Query>}
                </div >
            </div >
        )
    }
}

const mapStateToProps = ({
    isAuthorized,
}) => ({
    isAuthorized,
})

const mapDispatchToProps = dispatch => ({
    dispatchLogin: () => dispatch(login())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);