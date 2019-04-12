import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    logoutAction,
    getUserInfoAction
} from '../actions/index';
import Form from './HabitForm';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatchGetUserInfo, userId } = this.props;
        if (userId) {
            dispatchGetUserInfo(userId);
        }
    }

    render() {
        const { dispatchLogout, userInfo } = this.props;
        console.log(this.props.userInfo);
        if (!userInfo) {
            return null;
        }

        console.log(window.innerHeight);

        return (
            <section className="hero has-background-white-bis is-fullheight">

                <h1 className="is-size-3"> Welcome, {userInfo.email} </h1>
                <div className="field">
                    <p className="control">
                        <button className="button is-primary" onClick={e => dispatchLogout()}>
                            Logout
                        </button>
                    </p>
                </div>

                <div className="columns" style={{
                    margin: "2%",
                    height: window.innerHeight
                }}>

                    <div class="column is-one-third">
                        <div class="menu">
                            <p class="menu-label">
                                Habits
                            </p>
                            <ul class="menu-list">
                                <li><a>Dashboard</a></li>
                                <li><a>Dashboard</a></li>
                                <li><a className="is-active">Dashboard</a></li>
                                <li><a>Customers</a></li>
                            </ul>
                        </div>
                        <br />
                        <div>
                            <a> Add a new Habit </a>
                        </div>
                    </div>
                    <div className="column is-two-thirds">
                        <Form />
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({
    isAuthorized,
    userId,
    userInfo
}) => ({
    isAuthorized,
    userId,
    userInfo
})

const mapDispatchToProps = dispatch => ({
    dispatchLogout: () => dispatch(logoutAction()),
    dispatchGetUserInfo: (userId) => dispatch(getUserInfoAction(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
