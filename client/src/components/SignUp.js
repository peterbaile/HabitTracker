import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    signUpAction,
    updateResponseMessageAction,
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
            username: null,
        }
    }

    componentDidMount() {
        const { dipatchUpdateResponseMessage } = this.props;
        dipatchUpdateResponseMessage(null);
    }

    render() {
        const { email, password, username } = this.state;
        const { dispatchSignUp, responseMessage } = this.props;

        return (
            <section className="hero has-background-white-bis is-fullheight">
                <div className="columns is-centered" style={{
                    padding: "2%",
                    paddingTop: "10%"
                }}>
                    <div className="column is-half has-text-centered">
                        <div className="box">
                            <div>
                                <img src="https://www.launchterrehaute.com/wp-content/uploads/2017/05/Calendar-Icon-e1495568287395.png" width="128" height="128" />
                            </div>
                            <br />
                            <h1 className="is-size-3"> Sign Up </h1>
                            <h1 className="is-size-5"> To Use HabitTracker </h1>
                            <div className="field" style={{ marginTop: "3%" }}>
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
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Username" onChange={e => this.setState({ username: e.target.value })} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user-edit"></i>
                                    </span>
                                </p>
                            </div>
                            <div className="field is-grouped is-grouped-centered">
                                <p className="control">
                                    <button className="button is-warning is-rounded" onClick={e => dispatchSignUp(email, password, username)}>
                                        Sign Up
                                </button>
                                </p>
                                <p className="control">
                                    <button className="button is-info is-rounded" onClick={e => this.props.history.push('./')}>
                                        Back to Home
                                </button>
                                </p>
                            </div>
                            <p className="help has-text-centered"> {responseMessage} </p>
                        </div >
                    </div>
                </div >
            </section>
        )
    }
}

const mapStateToProps = ({
    responseMessage,
}) => ({
    responseMessage,
})

const mapDispatchToProps = dispatch => ({
    dispatchSignUp: (email, password, username) => dispatch(signUpAction(email, password, username)),
    dipatchUpdateResponseMessage: (message) => dispatch(updateResponseMessageAction(message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);