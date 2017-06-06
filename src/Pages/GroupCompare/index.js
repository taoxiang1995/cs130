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
            groups: [1,2]
        };
    };

    handleAddGroupOnClick(){

    }

    renderGroups(){
        return this.state.groups
        .map( function(group){
            return (
                <div className="card">
                    <Card_group/>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="PatientsOverview">
    
                <div className="info-cards-bg">
                    <div className="title">Create Groups</div>

                    <div className="card">
                        <Card_create_group/>
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