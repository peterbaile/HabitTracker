import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
    getHabitsAction,
} from '../actions/index';

class HabitInfo extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {userHabits, selectedHabit} = this.props;
        const habit = userHabits.filter(habit => habit.name === selectedHabit);
        return (
            <div>
                <p> {habit[0].status} </p>
                <p> {habit[0].message} </p>
            </div>
        );
    }

}

const mapStateToProps = ({
    userHabits,
    selectedHabit
}) => ({
    userHabits,
    selectedHabit
})

const mapDispatchToProps = dispatch => ({
    dispatchGetHabitsInfo: (userId) => dispatch(getHabitsAction(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HabitInfo);