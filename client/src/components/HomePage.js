import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    logoutAction,
    getUserInfoAction
} from '../actions/index';

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
        return (
            <section className="hero has-background-white-bis is-fullheight">
                <div className="columns is-centered" style={{
                    padding: "2%"
                }}>
                    <div className="column is-half">
                        <h1 className="is-size-3"> Welcome, {userInfo.email} </h1>
                        <div className="field">
                            <p className="control">
                                <button className="button is-primary" onClick={e => dispatchLogout()}>
                                    Logout
                                </button>
                            </p>
                        </div>
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
