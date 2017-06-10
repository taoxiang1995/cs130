import React, {Component} from 'react';
import axios from 'axios';
import DoughnutChart from '../../Components/data_charts/doughnut';
import BarChart from '../../Components/data_charts/bar';
import BloodStatLineChart from '../../Components/data_charts/line';
import SideBar from "../../Components/SideBar"
import {serverAddress} from '../../config';
import './style.css';


class PatientsOverview extends Component {

    constructor(props){
        super(props);
        this.state={
            records : [],
        }
    }

    componentDidMount() {
        axios.get(`${serverAddress}api/v1/information`, {
            headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            })
            .then((response)=>{
                //do soemthign with respnse
                this.setState({
                    records: response.data.data.response
                })
            })
            .catch(function(error) {
            });
    }

    get_bar_params(){
        let backgroundColor = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ]
        let borderColor = [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ]
        let map_key_lab = {
            1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "June",
            7: "July", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Sep"
        }

        let dct_date_count_by_month = {}
        this.state.records.forEach( (record) => {
            let m = new Date(record.patient.birthdate).getMonth()
            dct_date_count_by_month[m]? dct_date_count_by_month[m] += 1 : dct_date_count_by_month[m] = 1
        })

        let [bar_labels, bar_backgroundColor, bar_borderColor, bar_data] = [[],[],[],[]]
        for (let i = 1; i <= 12; i++){
            if (i in dct_date_count_by_month){
                bar_data.push(dct_date_count_by_month[i])
                bar_labels.push(map_key_lab[i])
                bar_backgroundColor.push(backgroundColor[i%backgroundColor.length])
                bar_borderColor.push(borderColor[i%borderColor.length])
            }
        }
        return ([bar_labels, bar_backgroundColor, bar_borderColor, bar_data])
    }

    /**
        // Latest DR distribution
        this.state.records.filter(record=>record.dr[record.dr.length - 1] == 0).length, 
        this.state.records.filter(record=>record.dr[record.dr.length - 1] == 1).length,
        this.state.records.filter(record=>record.dr[record.dr.length - 1] == 2).length,
        this.state.records.filter(record=>record.dr[record.dr.length - 1] == 3).length,
        this.state.records.filter(record=>record.dr[record.dr.length - 1] == 4).length

        // Gender Distribution
        this.state.records.filter(record=>record.patient.sex == "male").length, 
        his.state.records.filter(record=>record.patient.sex == "female").length
     */

    render() {
        let lst_patient_age = this.state.records.map(record =>new Date().getFullYear() - new Date(record.patient.birthdate).getFullYear())
        let [bar_labels, bar_backgroundColor, bar_borderColor, bar_data] = this.get_bar_params()
        return (
            <div className="Page">
             

                <div className="info-cards-bg">
                    <div className="title">Demographic Statistics</div>
                    
                    <div className="card">
                        <DoughnutChart
                            title="Latest DR Scores"
                            data={{
                                labels: [0,1,2,3,4],
                                datasets:[{
                                    data: [
                                        99, 64, 45, 10, 4
                                    ],
                                    backgroundColor: [
                                        "#B8FF33",
                                        "#ECFF33",
                                        "#FFD733",
                                        "#FF8033",
                                        "#FF4933"
                                    ],
                                    hoverBackgroundColor: [
                                        "#B8FF33",
                                        "#ECFF33",
                                        "#FFD733",
                                        "#FF8033",
                                        "#FF4933"
                                    ]
                                }]
                            }}
                            options={{
                                legend: {
                                    position: "bottom"
                                }
                            }}
                        />
                    </div>

                    <div className="card">
                        <DoughnutChart
                            title="Gender"
                            data={{
                                labels: [
                                    "male",
                                    "female"
                                ],
                                datasets:[{
                                    data: [
                                        144, 56
                                    ],
                                    backgroundColor: [
                                        "#36A2EB",
                                        "#FF6384"
                                    ],
                                    hoverBackgroundColor: [
                                        "#36A2EB",
                                        "#FF6384"
                                    ]
                                }]
                            }}
                            options={{
                                legend: {
                                    position: "bottom"
                                }
                            }}
                        />
                    </div>

                    <div className="card">
                        <DoughnutChart
                            title="Age"
                            data={{
                                labels: [
                                    "20-39",
                                    "40-59",
                                    "60-79"
                                ],
                                datasets:[{
                                    data: [
                                        lst_patient_age.filter(a => a >= 20 && a < 40).length,
                                        lst_patient_age.filter(a => a >= 40 && a < 60).length,
                                        lst_patient_age.filter(a => a >= 60 && a < 80).length,
                                    ],
                                    backgroundColor: [
                                        "#FF6384",
                                        "#36A2EB",
                                        "#FFCE56"
                                    ],
                                    hoverBackgroundColor: [
                                        "#FF6384",
                                        "#36A2EB",
                                        "#FFCE56"
                                    ]
                                }]
                            }}
                            options={{
                                legend: {
                                    position: "bottom"
                                }
                            }}
                        />
                    </div>

                    <div className="card">
                        <BarChart
                            title="Patient Update By Month"
                            data={{
                                labels: bar_labels,
                                datasets: [
                                    {
                                        backgroundColor: bar_backgroundColor,
                                        borderColor: bar_borderColor,
                                        borderWidth: 1,
                                        data: bar_data,
                                    }
                                ]
                            }}
                            options={{
                                legend: {
                                    display: false
                                },
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                    yAxes: [{
                                        stacked: true
                                    }]
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default PatientsOverview;