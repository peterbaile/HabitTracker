import React, { Component } from 'react';

class HabitForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goalPeriod: null,
        }
    }

    render() {
        return (
            <>
                <div className="field">
                    <label className="label"> Enter a name for your new habit </label>
                    <p className="control has-icons-left">
                        <input className="input is-rounded" type="email" placeholder="Reading" onChange={e => this.setState({ email: e.target.value })} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-signature"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <label className="label"> Choose a status for your new habit </label>
                    <div class="control has-icons-left">
                        <div class="select is-rounded">
                            <select>
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
                            <select>
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

                <div className="field">
                    <label className="label"> Set a goal </label>
                    <div class="control has-icons-left">
                        <div class="select is-rounded">
                            <select>
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

                <div className="field">
                    <label className="label"> Write something to motivate yourself </label>
                    <p className="control has-icons-left">
                        <input className="input is-rounded" type="email" placeholder="Bruh, Get this shit done" onChange={e => this.setState({ email: e.target.value })} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-fist-raised"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <p className="control">
                        <button className="button is-warning">
                            Let's get started ~
                        </button>
                    </p>
                </div>
            </>
        )
    }
}

export default HabitForm;