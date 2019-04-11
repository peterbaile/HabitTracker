import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

import { getUserQuery } from '../queries/index';
import { logoutAction } from '../actions/index';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { userId, dispatchLogout } = this.props;
        return (
            <div className="columns is-centered" style={{
                padding: "2%"
            }}>
                <div className="column is-half">
                    <h1 className="is-size-3"> Welcome </h1>
                    <Query query={getUserQuery} variables={{ userId }}>
                        {({ loading, error, data }) => {
                            if (loading) {
                                return null;
                            }


                            if (error) {
                                console.log(error.message);
                                return null;
                            }

                            console.log(data);

                            return data.users.map(user => {
                                return (
                                    <p> {user.email} </p>
                                )
                            });
                        }}
                    </Query>
                    <div class="field">
                        <p class="control">
                            <button class="button is-primary" onClick={e => dispatchLogout()}>
                                Logout
                        </button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({
    isAuthorized,
}) => ({
    isAuthorized,
})

const mapDispatchToProps = dispatch => ({
    dispatchLogout: () => dispatch(logoutAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
