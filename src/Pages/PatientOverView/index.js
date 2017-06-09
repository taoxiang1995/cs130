import React, {Component} from 'react';
import axios from 'axios';
import BloodStatLineChart from '../../Components/data_charts/PatientLine';
import DoctorUpdateForm from '../../Components/doctor_update';
import NewRecordCard from '../../Components/new_record_card';
import LargeNameCard from '../../Components/large_patient_card';
import SearchBar from '../../Components/SearchBar';
import Add from '../../Components/Add';
import Logo from '../../Components/Logo';
import SideBar from "../../Components/SideBar"
import {serverAddress} from "../../config";
import './style.css';


class PatientOverView extends Component {
    constructor(props){
        super(props);
        this.state={
            patient_info:{}
        }
    }

    getUrlVars() {
        let vars = [];
        let hash = {};
        let hashes = window.location.href;
        hashes = hashes.slice(window.location.href.indexOf('?')+1).split('&');
        for(let i = 0; i<hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

// this.setState({
//                     patientInfo: response.data,

//                     bloodSugerData: {
//                         labels: response.data.stats.blood_sugar.map((tv) => {return tv.time}),
//                         datasets: [
//                             {
//                                 fill: false,
//                                 lineTension: 0.1,
//                                 backgroundColor: "rgba(75,192,192,0.4)",
//                                 borderColor: "rgba(75,192,192,1)",
//                                 borderCapStyle: 'butt',
//                                 borderDash: [],
//                                 borderDashOffset: 0.0,
//                                 borderJoinStyle: 'miter',
//                                 pointBorderColor: "rgba(75,192,192,1)",
//                                 pointBackgroundColor: "#fff",
//                                 pointBorderWidth: 1,
//                                 pointHoverRadius: 5,
//                                 pointHoverBackgroundColor: "rgba(75,192,192,1)",
//                                 pointHoverBorderColor: "rgba(220,220,220,1)",
//                                 pointHoverBorderWidth: 2,
//                                 pointRadius: 3,
//                                 pointHitRadius: 10,
//                                 data: response.data.stats.blood_sugar.map((tv) => {return tv.value}),
//                                 spanGaps: false,
//                             }
//                         ]
//                     },

//                     bloodPressureData: {
//                         labels: response.data.stats.blood_pressure.map((tv) => {return tv.time}),
//                         datasets: [
//                             {
//                                 label: "high pressure",
//                                 fill: false,
//                                 lineTension: 0.1,
//                                 backgroundColor: "rgba(192,75,192,0.4)",
//                                 borderColor: "rgba(192,75,192,1)",
//                                 borderCapStyle: 'butt',
//                                 borderDash: [],
//                                 borderDashOffset: 0.0,
//                                 borderJoinStyle: 'miter',
//                                 pointBorderColor: "rgba(192,75,192,1)",
//                                 pointBackgroundColor: "#fff",
//                                 pointBorderWidth: 1,
//                                 pointHoverRadius: 5,
//                                 pointHoverBackgroundColor: "rgba(192,75,192,1)",
//                                 pointHoverBorderColor: "rgba(220,220,220,1)",
//                                 pointHoverBorderWidth: 2,
//                                 pointRadius: 3,
//                                 pointHitRadius: 10,
//                                 data: response.data.stats.blood_pressure.map((tv) => {return tv.high}),
//                                 spanGaps: false,
//                             },
//                             {
//                                 label: "low pressure",
//                                 fill: false,
//                                 lineTension: 0.1,
//                                 backgroundColor: "rgba(75,192,192,0.4)",
//                                 borderColor: "rgba(75,192,192,1)",
//                                 borderCapStyle: 'butt',
//                                 borderDash: [],
//                                 borderDashOffset: 0.0,
//                                 borderJoinStyle: 'miter',
//                                 pointBorderColor: "rgba(75,192,192,1)",
//                                 pointBackgroundColor: "#fff",
//                                 pointBorderWidth: 1,
//                                 pointHoverRadius: 5,
//                                 pointHoverBackgroundColor: "rgba(75,192,192,1)",
//                                 pointHoverBorderColor: "rgba(220,220,220,1)",
//                                 pointHoverBorderWidth: 2,
//                                 pointRadius: 3,
//                                 pointHitRadius: 10,
//                                 data: response.data.stats.blood_pressure.map((tv) => {return tv.low}),
//                                 spanGaps: false,
//                             }
//                         ]
//                     },

//                     bloodFatData: {
//                         labels: response.data.stats.blood_fat.map((tv) => {return tv.time}),
//                         datasets: [
//                             {
//                                 fill: false,
//                                 lineTension: 0.1,
//                                 backgroundColor: "rgba(75,192,192,0.4)",
//                                 borderColor: "rgba(75,192,192,1)",
//                                 borderCapStyle: 'butt',
//                                 borderDash: [],
//                                 borderDashOffset: 0.0,
//                                 borderJoinStyle: 'miter',
//                                 pointBorderColor: "rgba(75,192,192,1)",
//                                 pointBackgroundColor: "#fff",
//                                 pointBorderWidth: 1,
//                                 pointHoverRadius: 5,
//                                 pointHoverBackgroundColor: "rgba(75,192,192,1)",
//                                 pointHoverBorderColor: "rgba(220,220,220,1)",
//                                 pointHoverBorderWidth: 2,
//                                 pointRadius: 3,
//                                 pointHitRadius: 10,
//                                 data: response.data.stats.blood_fat.map((tv) => {return tv.value}),
//                                 spanGaps: false,
//                             }
//                         ]
//                     }
//                 })

    
    componentDidMount() {
        axios.get(`${serverAddress}api/v1/information/1`, {
            headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            })
            .then((response)=>{
                this.setState({
                    patient_info:response.data.data.response
                })
            })
            .catch(function(error) {});
    }

    doctorUpdate()
    {
        var popup = document.getElementById("updateForm");
        popup.classList.toggle("show");
        this.setState({uniqueID:this.state.uniqueID+1});
        
    }

    formatData(items, fieldName){
        return items.map(item=>{
            return {
                x:item.created_at,
                y:item[fieldName]
            }
        })
    }

    render() {
        debugger;
        if (this.state.patient_info.patient){
            return (
                <div className="Page">
                    <SideBar/>

                    <div className="info-cards-bg">

                        <div className="title">Patients Overview</div>

                        <div className="card">
                            <LargeNameCard
                                name={this.state.patient_info.patient.name}
                                id={this.state.patient_info.patient.id}
                                age={this.state.patient_info.patient.weight}
                                birthday={this.state.patient_info.patient.birthday}
                                className="card"
                            />
                        </div>

                        <div className="card">
                            <NewRecordCard
                                name={this.state.patient_info.patient.name}
                                id={this.state.patient_info.patient.id}
                                age={this.state.patient_info.patient.weight}
                                birthday={this.state.patient_info.patient.birthday}
                                className="card"
                                DoctorUpdateForm={this.doctorUpdate.bind(this)}
                            />
                        </div>

                        <div className="card">
                            <BloodStatLineChart 
                                title="Blood Suger Changes"
                                data={this.formatData(this.state.patient_info.blood_sugar, "number")}
                            />
                        </div>

                         <div className="card">
                            <BloodStatLineChart
                                title="Blood Pressure Low"
                                data={this.formatData(this.state.patient_info.blood_pressure, "low")}
                            />
                        </div>

                        <div className="card">
                            <BloodStatLineChart
                                title="Blood Pressure high"
                                data={this.formatData(this.state.patient_info.blood_pressure, "high")}
                            />
                        </div>

                        <div className="card">
                            <BloodStatLineChart
                                title="Blood Fat Changes"
                                data={this.formatData(this.state.patient_info.blood_fat, "number")}
                                options={{legend: {
                                    display: false
                                }}}
                            />
                        </div>

                       

                    </div>
                    <div className="PatientOverview-form" id="updateForm">
                        <div className="PatientOverview-form-pop" >
                            <DoctorUpdateForm key = {this.state.uniqueID}
                                DoctorUpdateForm={this.doctorUpdate.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    Loading...
                </div>
            )
        }
    }
}

export default PatientOverView;