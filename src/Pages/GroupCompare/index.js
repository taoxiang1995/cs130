import React, {Component} from 'react';
import axios from 'axios';
import DoughnutChart from '../../Components/data_charts/doughnut';
import BarChart from '../../Components/data_charts/bar';
import {Card_create_group, Card_group} from '../../Components/patient_group_card';
import AdjustableBloodStatLineChart from '../../Components/data_charts/adjustable_multi_line';
import SideBar from "../../Components/SideBar"
import BloodStatLineChart from '../../Components/data_charts/PatientLine';
import './style.css';
import {serverAddress} from '../../config';


class GroupCompare extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            chart_data_bs:[],
            chart_data_bf:[],
            chart_data_bph:[],
            chart_data_bpl:[],
            records:[]
        };
    };

    
    componentWillMount() {
         axios.get(`${serverAddress}api/v1/information`, {
            headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            })
            .then((response)=>{
                //do soemthign with respnse
                debugger;
                this.setState({
                    records: response.data.data.response
                })
            })
            .catch(function(error) {
        
        });
    }
    

    addGroup(g){
        this.setState({
            groups: this.state.groups.concat([g])
        },this.updateChart)
    }

    /*[{
        patient:{
            name
            ....
        }
        blood_sugar:[{
            created_at:sdadsd,
            number:123
        }],
        blood_fat:[],
        blood_pressure:[]
    }]*/
    filteredRecords(group){
        return this.state.records.filter(record=>{
            return group.gender == record.patient.sex&&
                   group.age_min<this.getAge(record.patient.birthdate)&&
                   this.getAge(record.patient.birthdate)<group.age_max
        })
    }

    getAge(birthdate){
        return new Date().getFullYear() - new Date(birthdate).getFullYear()
    }

    updateChart(){
        this.state.groups.forEach(function(group, index){
            this.setState({
                chart_data_bs:[...this.state.chart_data_bs, {
                    label:group.name?group.name:"unknown group",
                    //[{x:12, y:12}]
                    data:this.formatData(this.filteredRecords(group)[0].blood_sugar, "number"),
                }],
                chart_data_bf:[...this.state.chart_data_bf, {
                    label:group.name?group.name:"unknown group",
                    //[{x:12, y:12}]
                    data:this.formatData(this.filteredRecords(group)[0].blood_fat, "number"),
                }],
                chart_data_bph:[...this.state.chart_data_bph, {
                    label:group.name?group.name:"unknown group",
                    //[{x:12, y:12}]
                    data:this.formatData(this.filteredRecords(group)[0].blood_pressure, "high"),
                }],
                chart_data_bpl:[...this.state.chart_data_bpl, {
                    label:group.name?group.name:"unknown group",
                    //[{x:12, y:12}]
                    data:this.formatData(this.filteredRecords(group)[0].blood_pressure, "low"),
                }]
            })
        }.bind(this))
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

     formatData(items, fieldName){
        return items.map(item=>{
            return {
                x:item.created_at,
                y:item[fieldName]
            }
        })
    }

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

    /*
        output:
        [
            {
                data:[{x:1, y:2}]
                label:"dasdd"
            }
        ]
        input:
        blood_type:"blood_pressure",
        chart_data:[{
            label:"sd",
            data:
        }]
    */
    getBloodData

    render() {
        return (
            <div className="Page">
                <SideBar/>
                <div className="info-cards-bg">
                    <div className="title">Create Groups</div>

                    <div className="card">
                        <Card_create_group addGroup={this.addGroup.bind(this)}/>
                    </div>

                    {this.renderGroups()}
                    
                    <div className="title">Results</div>
                    <div className="card">
                        <BloodStatLineChart 
                                title="Blood Suger Changes"
                                data={this.state.chart_data_bs}
                            />
                    </div>
                    <div className="card">
                        <BloodStatLineChart 
                                title="Blood Suger Changes"
                                data={this.state.chart_data_bs}
                            />
                    </div>
                    <div className="card">
                        <BloodStatLineChart 
                                title="Blood Suger Changes"
                                data={this.state.chart_data_bs}
                            />
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupCompare;