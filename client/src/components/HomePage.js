import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    logoutAction,
    getUserInfoAction,
    getHabitsAction,
    updateHabitSelectionAction
} from '../actions/index';

import Form from './HabitForm';
import HabitInfo from './HabitInfo';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayForm: false
        }
    }

    componentDidMount() {
        const { 
            userHabits, 
            dispatchUpdateHabitSelection,
            dispatchGetUserInfo,
            dispatchGetHabitsInfo,
            userId
        } = this.props;

        if (userId) {
            dispatchGetUserInfo(userId);
            dispatchGetHabitsInfo(userId);
        }
    }

    renderRightPart(){
        const { displayForm } = this.state;
        const { 
            selectedHabit 
        } = this.props;

        if (!displayForm && !selectedHabit){
            return (
                <p> Please Select A Habit </p>
            )
        } else if (selectedHabit){
            return (<HabitInfo/>)
        } else if (displayForm){
            return (<Form />)
        }
    }

    handleClick(habitName){
        const {dispatchUpdateHabitSelection} = this.props;
        dispatchUpdateHabitSelection(habitName);
        this.setState({displayForm: false});
    }

    handleAddButtonClick(){
        const {dispatchUpdateHabitSelection} = this.props;
        this.setState({ displayForm: true });
        dispatchUpdateHabitSelection(null);
    }

    render() {
        const { 
            dispatchLogout, 
            userInfo, 
            userHabits, 
            
            selectedHabit 
        } = this.props;

        console.log(selectedHabit)

        if (!userInfo || !userHabits) {
            return null;
        }

        return (
            <section className="hero has-background-white-bis is-fullheight">
                <h1 className="is-size-3"> Welcome, {userInfo.username} </h1>
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

                    <div className="column is-one-third">
                        <div className="menu">
                            <p className="menu-label">
                                Habits
                            </p>

                            <ul className="menu-list">
                                {userHabits.map(habit => {
                                    return (
                                        <li><a className={habit.name === selectedHabit ? "is-active" : null} onClick={e => this.handleClick(habit.name)}> {habit.name} </a> </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <br />
                        <div>
                            <a onClick={e => this.handleAddButtonClick()}> Add a new Habit </a>
                        </div>
                    </div>
                    <div className="column is-two-thirds">
                        {this.renderRightPart()}
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({
    isAuthorized,
    userId,
    userInfo,
    userHabits,
    selectedHabit
}) => ({
    isAuthorized,
    userId,
    userInfo,
    userHabits,
    selectedHabit
})

const mapDispatchToProps = dispatch => ({
    dispatchLogout: () => dispatch(logoutAction()),
    dispatchGetUserInfo: (userId) => dispatch(getUserInfoAction(userId)),
    dispatchGetHabitsInfo: (userId) => dispatch(getHabitsAction(userId)),
    dispatchUpdateHabitSelection: habitName => dispatch(updateHabitSelectionAction(habitName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
