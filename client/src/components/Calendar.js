import React, { Component } from 'react';
import moment from 'moment';
import uuid from 'uuid';
import { connect } from 'react-redux';

import {
    updateSelectedDateAction,
    updateHabitAction,
} from '../actions/index';
import '../style/index.css';

const convertDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateObject: moment(),
        }
    }

    handleDateClick(day) {
        let { 
            selectedDate, 
            dispatchUpdateSelectedDate,
            userHabits,
            selectedHabit,
        } = this.props;

        const habit = userHabits.filter(habit => habit.name === selectedHabit)[0];

        selectedDate = new Date(selectedDate);
        selectedDate.setDate(day);

        const recordArray = habit.records.filter(record => convertDate(new Date(selectedDate)) === convertDate(new Date(record.date)));

        const times = recordArray.length === 0 ? null : recordArray[0].times

        dispatchUpdateSelectedDate(selectedDate, times);
        
    }

    render() {
        const { dateObject } = this.state;
        const firstDayOfMonth = moment(dateObject).startOf("month").format("d");
        const currentDay = dateObject.format("D");

        let blanks = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            blanks.push(
                <td key={uuid()}>{""}</td>
            );
        }

        let daysInMonth = [];
        for (let d = 1; d <= moment().daysInMonth(); d++) {
            daysInMonth.push(
                <td key={uuid()} className={d === Number(currentDay) ? "has-text-danger" : null} style={{ cursor: "pointer" }} onClick={e => this.handleDateClick(d)}>
                    {d}
                </td>
            )
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row); // if index not equal 7 that means not go to next week
            } else {
                rows.push(cells); // when reach next week we contain all td in last week to rows 
                cells = []; // empty container 
                cells.push(row); // in current loop we still push current row to new container
            }
            if (i === totalSlots.length - 1) { // when end loop we add remain date
                rows.push(cells);
            }
        });

        let daysinmonth = rows.map((d, i) => {
            return <tr>{d}</tr>;
        });

        return (
            <>
                <section className="hero has-background-white">
                    <div className="hero-body">
                        <div className="container">
                            <nav className="level has-text-weight-bold ">
                                <div className="level-item">
                                    <div>
                                        <span className="icon is-small"><i className="fas fa-chevron-left" style={{ cursor: "pointer" }} onClick={e => { }}></i></span>
                                    </div>
                                </div>
                                <div className="level-item">
                                    <div>
                                        <h1 className="is-size-5"> {dateObject.format("MMMM")} </h1>
                                    </div>
                                </div>
                                <div className="level-item">
                                    <div>
                                        <span className="icon is-small"><i className="fas fa-chevron-right" style={{ cursor: "pointer" }} onClick={e => { }}></i></span>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </section>
                <table className="table">
                    <thead>
                        <tr key={uuid()}>
                            {moment.weekdaysShort().map(day => {
                                return (
                                    <th key={uuid()}> {day} </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {daysinmonth}
                    </tbody>
                </table>
            </>
        );
    }
}

const mapStateToProps = ({
    userHabits,
    selectedDate,
    userId,
    selectedHabit
}) => ({
    userHabits,
    selectedDate,
    userId,
    selectedHabit
})

const mapDispatchToProps = dispatch => ({
    dispatchUpdateSelectedDate: (selectedDate, times) => dispatch(updateSelectedDateAction(selectedDate, times)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
