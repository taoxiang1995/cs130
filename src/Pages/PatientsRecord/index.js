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
import './style.css';

class PatientsRecord extends Component {
    //(1) inherit parent's props
    //(2) initialize state
    constructor(props){
        super(props);
        this.state={
            records : [],
            searchTerm:'',
            // addPatient: false
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

    setSearchTerm(searchTerm){
        this.setState({
            searchTerm
        })
    }
    
    patientSignUp() {
        var popup = document.getElementById("signUpForm");
        popup.classList.toggle("show");
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
            let idx_last_bs = record.blood_sugar.length;
            let idx_last_bf = record.blood_fat.length;
            let idx_last_bp = record.blood_pressure.length;
            return (
                <div className = "PatientsRecord-namecards">
                    <Link to="patientoverview">
                        <NameCard
                            name={record.patient.name}
                            id={record.patient.id}
                            birthday={record.patient.birthdate}
                            age={new Date().getFullYear() - new Date(record.patient.birthdate).getFullYear()}
                            blood_sugar={record.blood_sugar[idx_last_bs]? record.blood_sugar[idx_last_bs]:0}
                            blood_fat={record.blood_fat[idx_last_bf]? record.blood_fat[idx_last_bf]:0}
                            blood_pressure_high={record.blood_pressure[idx_last_bp]? record.blood_pressure[idx_last_bp].high:0}
                            blood_pressure_low={record.blood_pressure[idx_last_bp]? record.blood_pressure[idx_last_bp].low:0}
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
                    <div className="PatientsRecord-body" >
                        {this.renderRecords()}
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