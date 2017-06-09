import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
class PatientUpdate extends Component {
    constructor(props){
        super(props);
        this.state={
            personal_id:"xiangtao1995@gmail.com",
            blood_sugar:132,
            blood_fat:0.3,
            blood_pressure_high:139,
            blood_pressure_low:80,
            submitClass : " UpdatePForm-Submit-Name-Default UpdatePForm-Submit-Name-Base noselect",
            
        }
        this.submitClick = this.submitClick.bind(this);
        this.submitHover = this.submitHover.bind(this);
        this.submitDefault = this.submitDefault.bind(this);
        this.submitMousDown=this.submitMousDown.bind(this);
        this.classNameSex=this.classNameSex.bind(this);
    }

    submitClick(){
    var d = new Date();
    this.submitHover()
    console.log('personal_id:'+ this.state.personal_id +'\n'+
    'blood_sugar:'+ this.state.blood_sugar +'\n'+
    'blood_fat:'+ this.state.blood_fat +'\n'+
    'blood_pressure_high:'+ this.state.blood_pressure_high +'\n'+
    'blood_pressure_low:'+ `${this.state.blood_pressure_low}`+'\n'+
    'Date: '+d.getDate() + '-'+ d.getMonth()+ '-'+ d.getFullYear() + '-'+d.getHours() + ':'+d.getMinutes() + ':'+d.getSeconds()
    )
    this.postNewData();
    }
    
    postNewData()
    {
        axios.post('http://localhost:9000/patient_update', {
            blood_sugar:this.state.blood_sugar,
            blood_fat:this.state.blood_fat,
            blood_pressure:{
                high:this.state.blood_pressure_high,
                low:this.state.blood_pressure_low
            }
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
    {this.setState({submitClass: "UpdatePForm-Submit-Name-Base UpdatePForm-Submit-Name-Mouseover noselect"})}

    submitDefault()
    {this.setState({submitClass: "UpdatePForm-Submit-Name-Base UpdatePForm-Submit-Name-Default noselect"})}

    submitMousDown()
    {
        this.setState({submitClass: "UpdatePForm-Submit-Name-Base UpdatePForm-Submit-Name-Click noselect"})
    }

    classNameSex(sex)
    {
        if (this.state.sex != sex)
        {
            return "UpdatePForm-Sex-Default"
        }
        return "UpdatePForm-Sex-Default UpdatePForm-Sex-Selected"
    }



    render() {
        return (
            <div className="UpdatePForm">
                <div className="UpdatePForm-Title">
                    
                    
                    <div className="UpdatePForm-Title-Cancel">
                        <i className="fa fa-times UpdatePForm-Title-Cancel-i" aria-hidden="true"></i>    
                    </div>
                    <div className="UpdatePForm-Title-Name noselect">New Record</div>
                </div>
                <div className="UpdatePForm-Options">
                    {/*Items starts here*/}
                    <div className="UpdatePForm-Item">
                        <div className="UpdatePForm-Item-Name noselect">Blood Sugar:</div>
                        <div className="UpdatePForm-Item-Lower">
                            <input className="UpdatePForm-Item-Input"  type="text"  name="blood_sugar" 
                            value={this.state.blood_sugar}
                            onInput={(e)=>this.setState({blood_sugar: e.target.value})} />
                            <span className="UpdatePForm-Item-Unit" >Un</span>
                        </div>
                    </div>

                    <div className="UpdatePForm-Item">
                        <div className="UpdatePForm-Item-Name noselect">Blood Fat:</div>
                        <div className="UpdatePForm-Item-Lower">
                            <input className="UpdatePForm-Item-Input"  type="text" name="blood_fat" 
                            value={this.state.blood_fat}
                            onInput={(e)=>this.setState({blood_fat: e.target.value})} />
                            <span className="UpdatePForm-Item-Unit" >Un</span>
                        </div>
                    </div>

                    <div className="UpdatePForm-Item">
                        <div className="UpdatePForm-Item-Name noselect">Blood Presure (High):</div>
                        <div className="UpdatePForm-Item-Lower">
                            <input className="UpdatePForm-Item-Input"  type="text" name="blood_pressure_high" 
                            value={this.state.blood_pressure_high}
                            onInput={(e)=>this.setState({blood_pressure_high: e.target.value})} />
                            <span className="UpdatePForm-Item-Unit" >Un</span>
                        </div>
                    </div>

                    <div className="UpdatePForm-Item">
                        <div className="UpdatePForm-Item-Name noselect">Blood Presure (Low):</div>
                        <div className="UpdatePForm-Item-Lower">
                            <input className="UpdatePForm-Item-Input Birthday" name="blood_pressure_low" 
                            value={this.state.blood_pressure_low}
                            onInput={(e)=>this.setState({blood_pressure_low: e.target.value})} />
                            <span className="UpdatePForm-Item-Unit noselect" >Un</span>
                        </div>
                    </div>
                    

        

                </div>
                <div className="UpdatePForm-Submit">
                    <div className={this.state.submitClass}
                    onClick={this.submitClick}
                    onMouseDown={this.submitMousDown}
                    onMouseOver={this.submitHover}
                    onMouseLeave={this.submitDefault}
                    >Update</div>
                </div>
            </div>
        );
    }
}

export default PatientUpdate;

/*
                    <div className="UpdatePForm-Stats-Item">
                        <i className="fa fa-user-circle UpdatePForm-Stats-Item-Avatar" aria-hidden="true"></i>
                    </div>
                    
                    <div className="UpdatePForm-Stats-BF"></div>
*/ 