import React, {Component} from 'react';
import axios from 'axios';
import NameCard from './NameCard';
import SearchBar from '../../Components/SearchBar';
import Add from '../../Components/Add';
import Logo from '../../Components/Logo';
import PatientSignUp from '../../Components/patient_sign_up';
import PatientUpdate from '../../Components/patient_update';
import {Link} from 'react-router';
import SideBar from '../../Components/SideBar';
import {serverAddress} from '../../config';
import Alert from '../../Components/Alert';
import './style.css';

class PatientsRecord extends Component {
    //(1) inherit parent's props
    //(2) initialize state
    constructor(props){
        super(props);
        this.state={
            records : [],
            searchTerm:'',
            shouldOpen:true,
            type:'',

            // addPatient: false
        }
    }

    componentDidMount() {
        axios.get(`${serverAddress}api/v1/information`, {
            headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'},
            })
            .then((response)=>{
                //do soemthign with respnse
                this.setState({
                    records: response.data.data.response.slice(0, 50)
                })
            })
            .catch(function(error) {
        
        });
    }

    setSearchTerm(searchTerm){
        this.setState({
            searchTerm
        })
    }
    
    patientSignUp() {
        var popup = document.getElementById("signUpForm");
        popup.classList.toggle("show");
    }

    getLastIndex(records){
        return records.length-1;
    }

    renderRecords(){
        return this.state.records
        .filter(
            (record) =>{
                if (record.patient.name.includes(this.state.searchTerm)){
                    return true;
                }
                return false;
        })
        .map(function(record){
            return (
                <div className = "PatientsRecord-namecards col-md-4 col-sm-6 col-lg-3">
                    <Link to={"patientoverview?id="+record.patient.id}>
                        <NameCard
                            name={record.patient.name}
                            id={record.patient.id}
                            birthday={record.patient.birthdate}
                            age={new Date().getFullYear() - new Date(record.patient.birthdate).getFullYear()}
                            blood_sugar={record.blood_sugar[record.blood_sugar.length-1].number}
                            blood_fat={record.blood_fat[record.blood_fat.length-1].number}
                            blood_pressure_high={record.blood_pressure[record.blood_pressure.length-1].high}
                            blood_pressure_low={record.blood_pressure[record.blood_pressure.length-1].low}
                        />
                    </Link>
                </div>
            )
        })
    }
    

    render() {
        return (
            <div className="PatientsRecord-main">
                <SideBar/>
                <div className="PatientsRecord-page">
                    <div className="PatientsRecord-head">
                        
                        <div className="PatientsRecord-search PatientsRecord-headcontents">
                            <SearchBar
                            searchTerm={this.state.searchTerm}
                            setSearchTerm={this.setSearchTerm.bind(this)}
                            />
                        </div>
                        <div className="PatientsRecord-add PatientsRecord-headcontents">
                            <Add
                                patientSignUp={this.patientSignUp.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="PatientsRecord-body container" >
                        <div className="row">
                            {this.renderRecords()}
                        </div>
                    </div>
                    <div className="PatientsRecord-form" id="signUpForm">
                        <div className="PatientsRecord-form-pop">
                            <PatientSignUp
                                patientSignUp={this.patientSignUp.bind(this)}
                            />
                        </div>
                    </div>
                </div>
                
            </div>
                
        );
    }
}

export default PatientsRecord;