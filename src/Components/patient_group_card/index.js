import React, { Component } from 'react';
import { Button, DropdownButton, MenuItem, FormControl } from 'react-bootstrap';
import './style.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


export class Card_create_group extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdding: false,
            name:'',
            age_max:"100",
            age_min:"0",
            gender:'male',
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

        this.props.addGroup({
            name: this.state.name,
            age_max: this.state.age_max,
            age_min: this.state.age_min,
            gender: this.state.gender,
            medication: this.state.medication,
            policy: this.state.policy,
            dr_max: this.state.dr_max,
            dr_min: this.state.dr_min,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        });

        this.setState({
            isAdding: false,
            name:'',
            age_max:"100",
            age_min:"0",
            gender:'male',
            medication:'No Medication',
            policy:'No Policy',
            dr_max:"4",
            dr_min:"0",
            startDate:null,
            endDate: null
        })
        
        this.setState({isAdding: false});
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
                            <MenuItem eventKey="2">male</MenuItem>
                            <MenuItem eventKey="3">female</MenuItem>
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
                        Latest DR
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
            isAdding: false,
        };
    };

    handleClick() {
        this.setState({isAdding: true});
        this.props.removeGroup(this.props.groupInfo.name)
        this.setState({isAdding: false});
    };

    render() {
        return (
            <div className="Card-group">

                <div className="row_pair">
                    <div className="left-block">
                        Name
                    </div>
                    <div className="right-block">
                        {this.props.groupInfo.name}
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Age Range
                    </div>
                    <div className="right-block">
                        {this.props.groupInfo.age_min + " TO " + this.props.groupInfo.age_max}
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Gender
                    </div>
                    <div className="right-block">
                        {this.props.groupInfo.gender}
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Time Range
                    </div>
                    <div className="right-block">
                        <DateRangePicker
                            startDate={this.props.groupInfo.startDate} // momentPropTypes.momentObj or null,
                            endDate={this.props.groupInfo.endDate} // momentPropTypes.momentObj or null,
                            />
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        DR Score
                    </div>
                    <div className="right-block">
                        {this.props.groupInfo.dr_min + " TO " + this.props.groupInfo.dr_max}
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Medication
                    </div>
                    <div className="right-block">
                        {this.props.groupInfo.medication}
                    </div>
                </div>

                <div className="row_pair">
                    <div className="left-block">
                        Policy
                    </div>
                    <div className="right-block">
                        {this.props.groupInfo.policy}
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