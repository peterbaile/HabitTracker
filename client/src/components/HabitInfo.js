import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import {
    getHabitsAction,
    updateHabitAction,
    updateSelectedDateAction,
} from '../actions/index';
import Calendar from './Calendar';

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

const convertDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

class HabitInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            target: null,
            displaySlider: false,
        }
    }

    componentDidMount() {
        const {
            dispatchUpdateSelectedDate,
            userHabits,
            selectedHabit,
            selectedDate
        } = this.props;

        const habit = userHabits.filter(habit => habit.name === selectedHabit)[0];
        const recordArray = habit.records.filter(record => convertDate(new Date(selectedDate)) === convertDate(new Date(record.date)));

        const times = recordArray.length === 0 ? null : recordArray[0].times

        dispatchUpdateSelectedDate(selectedDate, times);

        this.setState({ target: times });
    }

    onSliderChange = (value) => {
        this.setState({ target: value });
    }

    handleSaveButtonClick = () => {
        const {
            dispatchUpdateHabit,
            dispatchUpdateSelectedDate,
            userId,
            selectedHabit,
            selectedDate
        } = this.props;
        const { target } = this.state;
        dispatchUpdateHabit(userId, { name: selectedHabit, date: selectedDate, times: target });
        dispatchUpdateSelectedDate(selectedDate, target);
    }

    renderSlider() {
        const { displaySlider, target } = this.state;
        if (displaySlider) {
            return (
                <>
                    <Slider handle={handle} value={target} onChange={this.onSliderChange} />
                    <br />
                    <p> New Times of Achievement: {typeof target === 'number' ? target : "--"} </p>
                    <a className="button is-info is-rounded" onClick={e => { this.handleSaveButtonClick() }}>
                        Save your record ~
                    </a>
                </>
            )
        }

        return null;
    }

    handleResetButtonClick = () => {
        this.setState({ target: null, displaySlider: true });
    }

    handleSliderButtonClick = () => this.setState({ displaySlider: !this.state.displaySlider });

    render() {
        const { target } = this.state;

        const { userHabits, selectedHabit, selectedDate, times } = this.props;

        const habit = userHabits.filter(habit => habit.name === selectedHabit)[0];

        const displayDate = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;

        const prefixMessageArray = ['Come On', "Don't be afriad", "Get this shit done"];
        const emojiArray = ["😃", "😄", "😁", "😀"];

        return (
            <div className="content">
                <section class="hero is-warning has-text-centered">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title" style={{ marginBottom: "20px" }}> {habit.name.toUpperCase()} </h1>
                            <h1 class="is-size-4 has-text-white" style={{ marginBottom: "20px" }}> {displayDate} </h1>
                            <nav className="level has-text-white has-text-weight-bold">
                                <div className="level-item">
                                    <div>
                                        <i className="fas fa-redo" style={{ cursor: "pointer" }} onClick={e => { this.handleResetButtonClick() }}></i>
                                    </div>
                                </div>
                                <div className="level-item">
                                    <div>
                                        <h1 class="is-size-1 has-text-white"> {typeof times === 'number' ? times : "--"} </h1>
                                    </div>
                                </div>
                                <div className="level-item">
                                    <div>
                                        <i className="fas fa-sliders-h" style={{ cursor: "pointer" }} onClick={e => { this.handleSliderButtonClick() }}></i>
                                    </div>
                                </div>
                            </nav>
                            {this.renderSlider()}
                        </div>
                    </div>
                </section>
                {/* <p> {prefixMessageArray[Math.floor(Math.random() * prefixMessageArray.length)]}! "{habit.message}" {emojiArray[Math.floor(Math.random() * emojiArray.length)]} </p> */}
                <br />
                <Calendar />
            </div>
        );
    }

}

const mapStateToProps = ({
    userHabits,
    selectedHabit,
    selectedDate,
    userId,
    times
}) => ({
    userHabits,
    selectedHabit,
    selectedDate,
    userId,
    times
})

const mapDispatchToProps = dispatch => ({
    dispatchGetHabitsInfo: (userId) => dispatch(getHabitsAction(userId)),
    dispatchUpdateHabit: (userId, updateSet) => dispatch(updateHabitAction(userId, updateSet)),
    dispatchUpdateSelectedDate: (selectedDate, times) => dispatch(updateSelectedDateAction(selectedDate, times)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HabitInfo);