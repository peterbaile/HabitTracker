import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import {
    addHabitAction,
    updateHabitAction,
} from '../actions/index';


const Handle = Slider.Handle;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

class HabitForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            status: "Build",
            goalPeriod: "Daily",
            target: 0,
            message: "",
        }
    }

    componentDidMount() {
        const { userHabits, selectedHabit } = this.props;
        const habit = userHabits.filter(habit => habit.name === selectedHabit)[0];

        if (habit) {
            this.setState({ name: habit.name, status: habit.status, goalPeriod: habit.goalPeriod, target: habit.target, message: habit.message });
        }
    }

    onSliderChange = (value) => {
        this.setState({ target: value });
    }

    handleUpdateHabitClick = () => {
        const { userId, dispatchUpdateHabit } = this.props;
        dispatchUpdateHabit(userId, this.state);
    }

    renderSubmitButton = (habit) => {
        const { dispatchAddHabit, dispatchUpdateHabit, userId } = this.props;
        if (habit) {
            return (
                <button className="button is-warning" onClick={e => this.handleUpdateHabitClick()}>
                    Update Habit ~
                </button>
            )
        }

        return (
            <button className="button is-warning" onClick={e => dispatchAddHabit(userId, this.state)}>
                Let's get started ~
            </button>
        )
    }

    render() {

        console.log(this.props);
        const { name, status, goalPeriod, target, message } = this.state;
        const { userId, dispatchAddHabit, userHabits, selectedHabit } = this.props;

        const habit = userHabits.filter(habit => habit.name === selectedHabit)[0];

        return (
            <>
                <div className="field">
                    <label className="label"> Enter a name for your habit </label>
                    <p className="control has-icons-left">
                        <input className="input is-rounded" type="text" placeholder="Reading" defaultValue={habit ? habit.name : null} onChange={e => this.setState({ name: e.target.value })} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-signature"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <label className="label"> Choose a status for your habit </label>
                    <div class="control has-icons-left">
                        <div class="select is-rounded">
                            <select onChange={e => this.setState({ status: e.target.value })} defaultValue={habit ? habit.status : "Build"}>
                                <option selected>Build</option>
                                <option>Quit</option>
                            </select>
                        </div>
                        <span class="icon is-left">
                            <i class="fas fa-pencil-ruler"></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label className="label"> Choose a goal period </label>
                    <div class="control has-icons-left">
                        <div class="select is-rounded">
                            <select onChange={e => this.setState({ goalPeriod: e.target.value })} defaultValue={habit ? habit.goalPeriod : "Daily"}>
                                <option selected>Daily</option>
                                <option>Weekly</option>
                                <option>Monthly</option>
                                <option>Yearly</option>
                            </select>
                        </div>
                        <span class="icon is-left">
                            <i class="fas fa-pencil-ruler"></i>
                        </span>
                    </div>
                </div>

                <label className="label"> Set a {goalPeriod} target </label>
                <div>
                    <p className="help"> Current Target: {target} </p>
                    <br />
                    <Slider handle={handle} onChange={this.onSliderChange} value={this.state.target} />
                </div>

                <div className="field">
                    <label className="label"> Write something to motivate yourself </label>
                    <p className="control has-icons-left">
                        <input className="input is-rounded" type="email" placeholder="Bruh, Get this shit done" onChange={e => this.setState({ message: e.target.value })} defaultValue={habit ? habit.message : null} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-fist-raised"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <p className="control">
                        {this.renderSubmitButton(habit)}
                    </p>
                </div>

                <div className="field">
                    <p className="help has-text-centered"> {userHabits && "Successful Update"} </p>
                </div>
            </>
        )
    }
}

const mapStateToProps = ({
    userId,
    userHabits,
    selectedHabit,
}) => ({
    userId,
    userHabits,
    selectedHabit,
})

const mapDispatchToProps = dispatch => ({
    dispatchAddHabit: (userId, updateSet) => dispatch(addHabitAction(userId, updateSet)),
    dispatchUpdateHabit: (userId, updateSet) => dispatch(updateHabitAction(userId, updateSet)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HabitForm);