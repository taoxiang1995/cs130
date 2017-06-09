import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import {serverAddress} from '../../config';
class PatientSignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"xiangtao1995@gmail.com",
            password:"123456674",
            name:"taoxiang",
            birthdate:"1995-11-24",
            height:180,
            weight:62,
            sex:"male",
            token:"12312fsdf2131321321",
            submitClass : " SignupForm-Submit-Name-Default SignupForm-Submit-Name-Base noselect", 
        }
        this.submitClick = this.submitClick.bind(this);
        this.submitHover = this.submitHover.bind(this);
        this.submitDefault = this.submitDefault.bind(this);
        this.submitMousDown=this.submitMousDown.bind(this);
        this.classNameSex=this.classNameSex.bind(this);
    }
    
    submitClick(){
        this.submitHover()
        console.log('email:'+ this.state.email +'\n'+
        'password:'+ this.state.password +'\n'+
        'name:'+ this.state.name +'\n'+
        'birthdate:'+ this.state.birthdate +'\n'+
        'height:'+ `${this.state.height}`+'\n'+
        'weight:'+ `${this.state.weight}` +'\n'+
        'sex:'+ this.state.sex +'\n')
        this.postNewPatient();
        var popup = document.getElementById("signUpForm");
        popup.classList.toggle("show");
    }
    
    postNewPatient()
    {
        axios.post(`${serverAddress}api/v1/signup_patient`,{
            email:this.state.email,
            password:this.state.password,
            name:this.state.name,
            birthdate:this.state.birthdate,
            height:this.state.height,
            weight:this.state.weight,
            sex:this.state.sex
        }, {
                headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
        })
        .then((response)=>{
            if (response.token == null)
            {
                console.log("Token not returned / wrong username+password");
                return;
            }
            console.log(response.token);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
    submitHover()
    {this.setState({submitClass: "SignupForm-Submit-Name-Base SignupForm-Submit-Name-Mouseover noselect"})}
    
    submitDefault()
    {this.setState({submitClass: "SignupForm-Submit-Name-Base SignupForm-Submit-Name-Default noselect"})}
    
    submitMousDown()
    {
        this.setState({submitClass: "SignupForm-Submit-Name-Base SignupForm-Submit-Name-Click noselect"})
    }
    
    classNameSex(sex)
    {
        if (this.state.sex != sex)
        {
            return "SignupForm-Sex-Default"
        }
        return "SignupForm-Sex-Default SignupForm-Sex-Selected"
    }
    
    
    
    render() {
        return (
        <div className="SignupForm">
        <div className="SignupForm-Title">
        
        
        <div className="SignupForm-Title-Cancel"
        onClick={()=>{
            this.props.patientSignUp()
        }} >
        <i className="fa fa-times SignupForm-Title-Cancel-i" aria-hidden="true"></i>    
        </div>
        <div className="SignupForm-Title-Name noselect">New Patient</div>
        </div>
        <div className="SignupForm-Options">
    {/*Items starts here*/}
    <div className="SignupForm-Item">
    <div className="SignupForm-Item-Name noselect">Username:</div>
    <div className="SignupForm-Item-Lower">
    <input className="SignupForm-Item-Input"  type="text"  name="email" 
    value={this.state.email}
    onInput={(e)=>this.setState({email: e.target.value})} />
    <span className="SignupForm-Item-Unit" ></span>
    </div>
    </div>
    
    <div className="SignupForm-Item">
    <div className="SignupForm-Item-Name noselect">Password:</div>
    <div className="SignupForm-Item-Lower">
    <input className="SignupForm-Item-Input"  type="text" name="password" 
    value={this.state.password}
    onInput={(e)=>this.setState({password: e.target.value})} />
    </div>
    </div>
    
    <div className="SignupForm-Item">
    <div className="SignupForm-Item-Name noselect">Name:</div>
    <div className="SignupForm-Item-Lower">
    <input className="SignupForm-Item-Input"  type="text" name="name" 
    value={this.state.name}
    onInput={(e)=>this.setState({name: e.target.value})} />
    <span className="SignupForm-Item-Unit" ></span>
    </div>
    </div>
    
    <div className="SignupForm-Item">
    <div className="SignupForm-Item-Name noselect">Birth Date:</div>
    <div className="SignupForm-Item-Lower">
    <input className="SignupForm-Item-Input Birthday"  type="date" name="birthdate" 
    value={this.state.birthdate}
    onInput={(e)=>{this.setState({birthdate: e.target.value})}} />
    </div>
    </div>
    
    <div className="SignupForm-Item">
    <div className="SignupForm-Item-Name noselect">Height:</div>
    <div className="SignupForm-Item-Lower">
    <input className="SignupForm-Item-Input "  type="text"name="height" 
    value={this.state.height}
    onInput={(e)=>this.setState({height: e.target.value})} />
    <span className="SignupForm-Item-Unit noselect" >cm</span>
    </div>
    </div>
    
    <div className="SignupForm-Item">
    <div className="SignupForm-Item-Name noselect">Weight:</div>
    <div className="SignupForm-Item-Lower">
    <input className="SignupForm-Item-Input"  type="text" name="weight" 
    value={this.state.weight}
    onInput={(e)=>this.setState({weight: e.target.value})} />
    <span className="SignupForm-Item-Unit noselect" >kg</span>
    </div>
    </div>
    
    <div className="SignupForm-Sex" >
    <div className="SignupForm-Item-Name noselect">Sex:</div>
    <div className="SignupForm-Sex-Lower">
    <div className= {this.classNameSex("male")}
    onClick={(e)=>this.setState({sex:"male"})}>
    <i className="fa fa-male SignupForm-Sex-M-i" aria-hidden="true"></i>    
    </div>
    <div className={this.classNameSex("female")}
    onClick={(e)=>this.setState({sex:"female"})}>
    <i className="fa fa-female SignupForm-Sex-F-i" aria-hidden="true"></i>    
    </div>
    </div>
    </div>
    
    </div>
    <div className="SignupForm-Submit">
    <div className={this.state.submitClass}
    onClick={this.submitClick}
    onMouseDown={this.submitMousDown}
    onMouseOver={this.submitHover}
    onMouseLeave={this.submitDefault}
    >Register</div>
    </div>
    </div>
    );
}
}

export default PatientSignUp;

/*
<div className="SignupForm-Stats-Item">
<i className="fa fa-user-circle SignupForm-Stats-Item-Avatar" aria-hidden="true"></i>
</div>

<div className="SignupForm-Stats-BF"></div>
*/ 