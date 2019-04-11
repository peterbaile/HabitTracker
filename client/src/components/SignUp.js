import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';

import { addUserMutation } from '../queries/index';
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
        const { email, password, submitted, success } = this.state;
        const {dispatchSignUp, userId} = this.props;

        console.log(`signUp: ${userId}`);

        return (
            <div className="columns is-centered" style={{
                padding: "2%"
            }}>
                <div className="column is-half">
                    <h1 className="is-size-3 has-text-centered"> Sign Up :) </h1>
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
                            <button class="button is-primary" onClick={e => this.props.history.push('./')}>
                                Back to Home
                            </button>
                        </p>
                        <p class="control">
                            <button class="button is-primary" onClick={e => dispatchSignUp(email, password)}>
                                Sign Up
                            </button>
                        </p>
                    </div>

                    {/* {submitted && <Mutation mutation={addUserMutation}>
                        {addUser => {
                            addUser({ variables: { email, password } })
                            {this.setState({ submitted: false, success: true })}

                            return null;
                        }}
                    </Mutation>} */}

                    {success && <p class="help has-text-centered">Successful sign up</p>}
                </div >
            </div >
        )
    }
}

const mapStateToProps = ({
    userId
}) => ({
    userId
})

const mapDispatchToProps = dispatch => ({
    dispatchSignUp: (email, password) => dispatch(signUpAction(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);