import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar, Line } from 'react-chartjs-2';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import randomColor from 'randomcolor';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import {
    getHabitsAction,
    updateHabitAction,
    updateSelectedDateAction,
    removeHabitAction,
} from '../actions/index';
import Calendar from './Calendar';
import Form from './HabitForm';

const options = {
    legend: {
        display: false,
    },
    title: {
        display: true,
        text: "Your Progress",
        fontSize: 25
    },
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                beginAtZero: true   // minimum value will be 0.
            }
        }]
    }
}

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

const compare = (record1, record2) => {
    const date1 = new Date(record1.date);
    const date2 = new Date(record2.date);

    if (date1 <= date2){
        return -1
    } else {
        return 1
    }
}

const getGoalData = (recordsArray) => {
    let backgroundColor = [];
    let labels = [];
    let timesArray = [];

    if (recordsArray) {
        recordsArray.sort(compare);
        recordsArray.map(record => {
            backgroundColor.push(randomColor({
                luminosity: 'light',
                format: 'rgba',
                alpha: 0.6,
            }));

            const date = new Date(record.date);

            labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
            timesArray.push(record.times);
        })
    }

    return {
        labels: labels,
        datasets: [{
            data: timesArray,
            backgroundColor: backgroundColor
        }]
    }
}

class HabitInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            target: null,
            displaySlider: false,
            displayForm: false,
            goalData: null,
        }
    }

    componentWillUpdate(newProps) {
        const { selectedHabit } = this.props;
        
        if (selectedHabit !== newProps.selectedHabit) {
            this.setState({ target: null, displaySlider: false, displayForm: false });
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
            selectedDate,
        } = this.props;
        const { target } = this.state;
        dispatchUpdateHabit(userId, { oldName: selectedHabit, name: selectedHabit, date: selectedDate, times: target });
        dispatchUpdateSelectedDate(selectedDate, target);
    }

    renderSlider = () => {
        const { displaySlider, target } = this.state;
        if (displaySlider) {
            return (
                <>
                    <Slider handle={handle} value={target} onChange={this.onSliderChange} />
                    <br />
                    <p> New Times of Achievement: {typeof target === 'number' ? target : "--"} </p>
                    <a className="button is-info is-rounded" onClick={this.handleSaveButtonClick}>
                        Save your record ~
                    </a>
                </>
            )
        }

        return null;
    }

    handleEditButtonClick = () => {
        this.setState({ displayForm: !this.state.displayForm });
    }

    handleResetButtonClick = () => {
        this.setState({ target: null, displaySlider: true });
    }

    handleSliderButtonClick = () => this.setState({ displaySlider: !this.state.displaySlider });

    render() {
        const { displayForm } = this.state;

        const { userHabits, selectedHabit, selectedDate, times } = this.props;

        const habit = userHabits.filter(habit => habit.name === selectedHabit)[0];

        const displayDate = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;

        const prefixMessageArray = ['Come On', "Don't be afriad", "Get this shit done"];
        const emojiArray = ["😃", "😄", "😁", "😀"];

        if (displayForm) {
            return (
                <Form handleEditFunction={this.handleEditButtonClick} />
            )
        }

        return (
            <>
                <div className="content">
                    <section className="hero is-warning has-text-centered">
                        <div className="hero-body">
                            <div className="container">
                                <div className="columns">
                                    <div className="column is-one-third">
                                    </div>
                                    <div className="column is-one-third">
                                        <h1 className="title">{habit.name.toUpperCase()}</h1>
                                    </div>
                                    <div className="column">
                                        <i className="fas fa-edit is-size-4" style={{ cursor: "pointer" }} onClick={this.handleEditButtonClick} ></i>
                                    </div>
                                </div>
                                <h1 className="is-size-4 has-text-white" style={{ marginBottom: "20px" }}> {displayDate} </h1>
                                <nav className="level has-text-white has-text-weight-bold">
                                    <div className="level-item">
                                        <div>
                                            <i className="fas fa-redo" style={{ cursor: "pointer" }} onClick={this.handleResetButtonClick}></i>
                                        </div>
                                    </div>
                                    <div className="level-item">
                                        <div>
                                            <h1 className="is-size-1 has-text-white"> {typeof times === 'number' ? times : "--"} </h1>
                                        </div>
                                    </div>
                                    <div className="level-item">
                                        <div>
                                            <i className="fas fa-sliders-h" style={{ cursor: "pointer" }} onClick={this.handleSliderButtonClick}></i>
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
                    <br />
                    <Bar data={getGoalData(habit.records)} height={200} options={options} />
                </div>
            </>
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
    dispatchRemoveHabit: (userId, habitName) => dispatch(removeHabitAction(userId, habitName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HabitInfo);