import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import {
    addHabitAction
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

    onSliderChange = (value) => {
        this.setState({ target: value });
    }

    render() {

        const { name, status, goalPeriod, target, message } = this.state;
        const { userId, dispatchAddHabitAction, userHabits } = this.props;


        return (
            <>
                <div className="field">
                    <label className="label"> Enter a name for your new habit </label>
                    <p className="control has-icons-left">
                        <input className="input is-rounded" type="email" placeholder="Reading" onChange={e => this.setState({ name: e.target.value })} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-signature"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <label className="label"> Choose a status for your new habit </label>
                    <div class="control has-icons-left">
                        <div class="select is-rounded">
                            <select onChange={e => this.setState({ status: e.target.value })}>
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
                            <select onChange={e => this.setState({ goalPeriod: e.target.value })}>
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
                    <Slider handle={handle} onChange={this.onSliderChange} />
                </div>

                <div className="field">
                    <label className="label"> Write something to motivate yourself </label>
                    <p className="control has-icons-left">
                        <input className="input is-rounded" type="email" placeholder="Bruh, Get this shit done" onChange={e => this.setState({ message: e.target.value })} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-fist-raised"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <p className="control">
                        <button className="button is-warning" onClick={e => dispatchAddHabitAction(userId, this.state)}>
                            Let's get started ~
                        </button>
                    </p>
                </div>
            </>
        )
    }
}

const mapStateToProps = ({
    userId,
    userHabits,
}) => ({
    userId,
    userHabits,
})

const mapDispatchToProps = dispatch => ({
    dispatchAddHabitAction: (userId, updateSet) => dispatch(addHabitAction(userId, updateSet))
})

export default connect(mapStateToProps, mapDispatchToProps)(HabitForm);