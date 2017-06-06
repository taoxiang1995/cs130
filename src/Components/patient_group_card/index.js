import React, { Component } from 'react';
import { Button, DropdownButton, MenuItem, FormControl } from 'react-bootstrap';
import './style.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


const options = [
  'one', 'two', 'three'
]
const defaultOption = options[0]

export class Card_create_group extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            isAdding: false,
            name:'',
            age_max:"100",
            age_min:"0",
            gender:'Both',
            medication:'No Medication',
            policy:'No Policy',
            dr_max:"4",
            dr_min:"0",
            startDate:null,
            endDate: null
        };
    };

    handleClick() {
        this.setState({isAdding: true});

        // This probably where you would have an `ajax` call
        setTimeout(() => {
        // Completed of async action, set loading state back
        this.setState({isAdding: false});
        }, 2000);
    };

    handleChange(e) {
        debugger;
        this.setState({ value: e.target.value });
    };

    handleInput(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleDataInput(start, end){
        this.setState({
            startDate: start,
            endDate: end
        })
    }

    handleDropDownSelect(name){
        return function handleSelect(key, e){
            this.setState({
                [name]:e.target.innerText
            })
        }.bind(this)
    }

    render() {
        return (
            <div className="Card-group">

                <div className="row_pair">
                    <div className="left-block">
                        Name
                    </div>
                    <div className="right-block">
                        <FormControl
                            name="name"
                            type="text"
                            value={this.state.name}
                            placeholder="Enter text"
                            onChange={this.handleInput.bind(this)}
                        />
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Age Range
                    </div>
                    <div className="right-block">
                        <div className="full-width">
                            <FormControl
                                name="age_min"
                                type="text"
                                value={this.state.age_min}
                                placeholder="0"
                                onChange={this.handleInput.bind(this)}
                            />
                            <div>TO</div>
                            <FormControl
                                name="age_max"
                                type="text"
                                value={this.state.age_max}
                                placeholder="100"
                                onChange={this.handleInput.bind(this)}
                            />
                        </div>
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Gender
                    </div>
                    <div className="right-block">
                        <DropdownButton
                            onSelect={this.handleDropDownSelect('gender')} 
                            title={this.state.gender} bsSize="small">
                            <MenuItem eventKey="1">Both</MenuItem>
                            <MenuItem eventKey="2">Male</MenuItem>
                            <MenuItem eventKey="3">Female</MenuItem>
                        </DropdownButton>
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Time Range
                    </div>
                    <div className="right-block">
                        <DateRangePicker
                            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                            />
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        DR Score
                    </div>
                    <div className="right-block">
                        <div className="full-width">
                            <DropdownButton
                                onSelect={this.handleDropDownSelect('dr_min')} 
                                title={this.state.dr_min} bsSize="small">
                                <MenuItem eventKey="0">0</MenuItem>
                                <MenuItem eventKey="1">1</MenuItem>
                                <MenuItem eventKey="2">2</MenuItem>
                                <MenuItem eventKey="3">3</MenuItem>
                                <MenuItem eventKey="4">4</MenuItem>
                            </DropdownButton>
                            <div>TO</div>
                            <DropdownButton
                                onSelect={this.handleDropDownSelect('dr_max')} 
                                title={this.state.dr_max} bsSize="small">
                                <MenuItem eventKey="0">0</MenuItem>
                                <MenuItem eventKey="1">1</MenuItem>
                                <MenuItem eventKey="2">2</MenuItem>
                                <MenuItem eventKey="3">3</MenuItem>
                                <MenuItem eventKey="4">4</MenuItem>
                            </DropdownButton>
                        </div>
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Medication
                    </div>
                    <div className="right-block">
                        <DropdownButton
                            onSelect={this.handleDropDownSelect('medication')} 
                            title={this.state.medication} bsSize="small">
                            <MenuItem eventKey="1">No Medication</MenuItem>
                            <MenuItem eventKey="2">Drug 1</MenuItem>
                            <MenuItem eventKey="3">Drug 2</MenuItem>
                        </DropdownButton>
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Policy
                    </div>
                    <div className="right-block">
                        <DropdownButton
                            onSelect={this.handleDropDownSelect('policy')}  
                            title={this.state.policy} bsSize="small">
                            <MenuItem eventKey="1">No Policy</MenuItem>
                            <MenuItem eventKey="2">Policy 1</MenuItem>
                            <MenuItem eventKey="3">Policy 2</MenuItem>
                        </DropdownButton>
                    </div>
                </div>

                <div className="row_pair">
                    <div className="center">
                        <Button
                            bsStyle="primary"
                            disabled={this.state.isAdding}
                            onClick={!this.state.isAdding ? this.handleClick.bind(this) : null}
                            bsClass="group_button">
                            <div>{this.state.isAdding ? 'Adding...' : 'Add Group'}</div>
                        </Button>
                    </div>
                </div>

            </div>
        );
    }
}


export class Card_group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            isAdding: false,
            name:'Group1',
            age_max:"100",
            age_min:"0",
            gender:'Both',
            medication:'No Medication',
            policy:'No Policy',
            dr_max:"4",
            dr_min:"0",
            startDate:null,
            endDate: null
        };
    };

    handleClick() {
        this.setState({isAdding: true});

        // This probably where you would have an `ajax` call
        setTimeout(() => {
        // Completed of async action, set loading state back
        this.setState({isAdding: false});
        }, 2000);
    };

    render() {
        return (
            <div className="Card-group">

                <div className="row_pair">
                    <div className="left-block">
                        Name
                    </div>
                    <div className="right-block">
                        {this.state.name}
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Age Range
                    </div>
                    <div className="right-block">
                        {this.state.age_min + " TO " + this.state.age_max}
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Gender
                    </div>
                    <div className="right-block">
                        {this.state.gender}
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Time Range
                    </div>
                    <div className="right-block">
                        {"time_start to time_end"}
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        DR Score
                    </div>
                    <div className="right-block">
                        {this.state.dr_min + " TO " + this.state.dr_max}
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Medication
                    </div>
                    <div className="right-block">
                        {this.state.medication}
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Policy
                    </div>
                    <div className="right-block">
                        {this.state.policy}
                    </div>
                </div>

                <div className="row_pair">
                    <div className="center">
                        <Button
                            bsStyle="primary"
                            disabled={this.state.isAdding}
                            onClick={!this.state.isAdding ? this.handleClick.bind(this) : null}
                            bsClass="group_button">
                            <div>{this.state.isAdding ? 'Removing...' : 'Remove Group'}</div>
                        </Button>
                    </div>
                </div>

            </div>
        );
    }
}