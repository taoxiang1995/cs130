import React, {Component} from 'react';
import axios from 'axios';
import DoughnutChart from '../../Components/data_charts/doughnut';
import BarChart from '../../Components/data_charts/bar';
import BloodStatLineChart from '../../Components/data_charts/line';
import {Card_create_group, Card_group} from '../../Components/patient_group_card';
import AdjustableBloodStatLineChart from '../../Components/data_charts/adjustable_multi_line';
import './style.css';


class PatientsOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [
                {name: "TEST 1"},
                {name: "TEST 2"}
            ]
        };
    };

    addGroup(g){
        this.setState({
            groups: this.state.groups.push(g)
        })
    }

    removeGroup(name){
        this.setState({
            groups: this.state.groups.filter(
                (g) =>{
                    if(g.name == name){
                        return false
                    }
                    else{
                        return true
                    }
                }
            )
        })
    }

    //removeGroup={this.removeGroup.bind(this)}
    renderGroups(){
        return this.state.groups
        .map( function(group){
            return (
                <div className="card">
                    <Card_group
                    removeGroup={this.removeGroup.bind(this)} 
                    groupInfo={group}/>
                </div>
            )
        }.bind(this))
    }

    render() {
        return (
            <div className="PatientsOverview">
    
                <div className="info-cards-bg">
                    <div className="title">Create Groups</div>

                    <div className="card">
                        <Card_create_group addGroup={this.addGroup.bind(this)}/>
                    </div>

                    {this.renderGroups()}
                    
                    <div className="title">Results</div>
                    <div className="card">
                        <AdjustableBloodStatLineChart/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PatientsOverview;