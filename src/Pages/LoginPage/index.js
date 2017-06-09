import React, {Component} from 'react';
import Login from './Login';
import './style.css';
import {browserHistory} from 'react-router';
import axios from 'axios';
import {serverAddress} from '../../config';
class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }

    SignUp(email, password){
        axios.post(serverAddress+'api/v1/signup_doctor', {
        email,
        password
        })
        .then(function (response) {
            sessionStorage.setItem('token', response['data']['data']['json']['auth_token']);
            sessionStorage.setItem('identity', 'doctor');
            browserHistory.push('/patientsrecord');

        })
        .catch(function (error, response) {
            console.error('Error signing in');
        });
    }

    DocSignIn(email, password){
        axios.post(serverAddress+'api/v1/auth_doctor', {
            email,
            password
        })
        .then(function (response) {
            sessionStorage.setItem('token', response['data']['data']['json']['auth_token']);
            sessionStorage.setItem('identity', 'doctor');
            browserHistory.push('/patientsrecord');
        })
        .catch(function (error) {
            console.error('error signing in: '+error)
        });
    }

    PatientSignIn(email, password){
        axios.post(serverAddress+'api/v1/auth_patient', {
            email,
            password
        })
        .then(function (response) {
            sessionStorage.setItem('token', response['data']['data']['json']['auth_token']);
            sessionStorage.setItem('identity', 'patient');
            browserHistory.push('/patientoverview');
        })
        .catch(function (error) {
            console.error('error signing in: '+error)
        });
    }

    PatientSignOut(){
        sessionStorage.setItem('token', null);
        sessionStorage.setItem('identity', 'patient');
        browserHistory.push('/patientoverview');
    }

    DoctorSignOut(){
        sessionStorage.setItem('token', null);
        sessionStorage.setItem('identity', 'doctor');
        browserHistory.push('/patientsrecord');
    }

    
    
    render() {
        return (
            <div className="login-container">
                <Login
                    SignUp={this.SignUp.bind(this)}
                    DocSignIn={this.DocSignIn.bind(this)}
                    PatientSignIn={this.PatientSignIn.bind(this)}
                    PatientSignOut={this.PatientSignOut.bind(this)}
                    DoctorSignOut={this.DoctorSignOut.bind(this)}
                />
            </div>
        );
    }
}

export default LoginPage;