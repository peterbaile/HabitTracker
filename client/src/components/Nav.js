import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    logoutAction,
} from '../actions/index';

class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { username, dispatchLogout } = this.props;

        return (
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item">
                        <h1 className="is-size-3"> Welcome, {username} </h1>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <button className="button is-primary" onClick={e => dispatchLogout()}>
                                    Logout
                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchLogout: () => dispatch(logoutAction()),
})

export default connect(null, mapDispatchToProps)(Nav);