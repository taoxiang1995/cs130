import React, { Component } from 'react';
import DoctorUpdateDR from '../../Components/doctor_update_DR';
import DoctorUpdateDrugs from '../../Components/doctor_update_drugs';
import './style.css';
import axios from 'axios';
import Time from 'react-time';
import {serverAddress} from '../../config';
import Alert from '../Alert';

class DoctorUpdate extends Component {
    constructor(props){
        super(props);
        this.state={
            shouldOpen: 'true',
            content:'',   
            uniqueID  :0,
            page : 'base',
            personal_id:"xiangtao1995@gmail.com",
            token:"12312fsdf2131321321",
            name:"taoxiang",
            birthday:"1995-11-24",
            last_visit:"2015-10-04",
            height:180,
            weight:62,

            DR_time:"2017-03-34-10-12",
            DR_left_score:4,
            DR_right_score:3,
            DR_left_photo:"",
            DR_right_photo:"",
            DR_right_note:"its really bad",
            DR_left_note:"its good",
            
            blood_fat_time:"2017-03-34-10-12",
            blood_fat:0.12,
            blood_pressure_time:"2017-03-34-10-12",
            blood_pressure_high:120,
            blood_pressure_low:80,
            blood_sugar_time:"2017-03-34-10-12",
            blood_sugar:14.32,

            visits:{
             visit_time:"2017-03-34-10-12",
             follow_up_time:"2018-03-34-10-12",
             Note:"you gotta eat an apple a day",
             drug_use:[{
                 drug:"xxx1",
                 dose:"1 pill per day",
                 len:"1 year"
                },{
                 drug:"xxx2",
                 dose:"2 pill per day",
                 len:"2 year"
                 }]},
            submitClass : " UpdateDForm-Submit-Name-Default UpdateDForm-Submit-Name-Base noselect",
            DBleftClass: "UpdateDForm-IP-Base UpdateDForm-IP-Default noselect",
            DBrightClass: "UpdateDForm-IP-Base UpdateDForm-IP-Default noselect",
            prescriptionClass: "UpdateDForm-IP-Base UpdateDForm-IP-Default noselect",
            DBleft:false,
            DBright:false,
            prescription:false

        }

        this.submitClick = this.submitClick.bind(this);
        this.submitHover = this.submitHover.bind(this);
        this.submitDefault = this.submitDefault.bind(this);
        this.submitMousDown=this.submitMousDown.bind(this);

        this.DBleftClick = this.DBleftClick.bind(this);
        this.DBleftHover = this.DBleftHover.bind(this);
        this.DBleftDefault = this.DBleftDefault.bind(this);
        this.DBleftMousDown=this.DBleftMousDown.bind(this);

        this.DBrightClick = this.DBrightClick.bind(this);
        this.DBrightHover = this.DBrightHover.bind(this);
        this.DBrightDefault = this.DBrightDefault.bind(this);
        this.DBrightMousDown=this.DBrightMousDown.bind(this);

        this.prescriptionClick = this.prescriptionClick.bind(this);
        this.prescriptionHover = this.prescriptionHover.bind(this);
        this.prescriptionDefault = this.prescriptionDefault.bind(this);
        this.prescriptionMousDown=this.prescriptionMousDown.bind(this);
        this.Dataexit = this.Dataexit.bind(this);

        this.DBleftDefault();
        this.submitDefault();
        this.DBrightDefault();
        this.prescriptionDefault();
        
    }

    submitClick(){
    this.submitHover()
    console.log('personal_id:'+ this.state.personal_id +'\n'+
    'pass_word:'+ this.state.pass_word +'\n'+
    'name:'+ this.state.name +'\n'+
    'birthday:'+ this.state.birthday +'\n'+
    'height:'+ `${this.state.height}`+'\n'+
    'weight:'+ `${this.state.weight}` +'\n'+
    'DR_right_score:'+ `${this.state.DR_right_score}` +'\n'+
    'DR_left_score:'+ `${this.state.DR_left_score}` +'\n'+
    'sex:'+ this.state.sex +'\n')
    this.postUpdate();
}

    postUpdate()
    {
      axios.post(`${serverAddress}api/v1/information`, {
      email:this.state.personal_id,
      DR:{
            left_score:this.state.DR_left_score,
            right_score:this.state.DR_right_score,
            left_photo:this.state.DR_left_photo,
            right_photo:this.state.DR_right_photo,
            right_note:this.state.DR_right_note,
            left_note:this.state.DR_left_note
      },
      blood_fat:{
            number:this.state.blood_fat
      },
      blood_pressure:{
            high:this.state.blood_pressure_high,
            low:this.state.blood_pressure_low
      },
      blood_sugar:{
            number:this.state.blood_sugar
      },
      },{
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
    {this.setState({submitClass: "UpdateDForm-Submit-Name-Base UpdateDForm-Submit-Name-Mouseover noselect"})}

    submitDefault()
    {this.setState({submitClass: "UpdateDForm-Submit-Name-Base UpdateDForm-Submit-Name-Default noselect"})}

    submitMousDown()
    {this.setState({submitClass: "UpdateDForm-Submit-Name-Base UpdateDForm-Submit-Name-Click noselect"})}


        DBleftClick()
        {
            this.DBleftHover();
            console.log('Open DBLEFT');
            this.setState({page:"LeftDR"});
        }
        DBleftHover()
        {this.setState({DBleftClass: "UpdateDForm-IP-Base UpdateDForm-IP-Mouseover noselect"})}
        DBleftDefault()
        {
            if(this.state.DBleft)
            {
                this.setState({DBleftClass: "UpdateDForm-IP-Base UpdateDForm-IP-Saved noselect"});
                return;
            }
            this.setState({DBleftClass: "UpdateDForm-IP-Base UpdateDForm-IP-Default noselect"});
                return;
        }
        DBleftMousDown()
        {this.setState({DBleftClass: "UpdateDForm-IP-Base UpdateDForm-IP-Click noselect"})}

        DBrightClick()
        {
            this.DBrightHover();
            console.log('Open DBright');
            this.setState({page:"RightDR"});
        }
        DBrightHover()
        {this.setState({DBrightClass: "UpdateDForm-IP-Base UpdateDForm-IP-Mouseover noselect"})}
        DBrightDefault()
        {
            if(this.state.DBright)
            {
                this.setState({DBrightClass: "UpdateDForm-IP-Base UpdateDForm-IP-Saved noselect"});
                return;
            }
            this.setState({DBrightClass: "UpdateDForm-IP-Base UpdateDForm-IP-Default noselect"});
                return;
        }
        DBrightMousDown()
        {this.setState({DBrightClass: "UpdateDForm-IP-Base UpdateDForm-IP-Click noselect"})}

        prescriptionClick()
        {
            this.prescriptionHover();
            console.log('Open prescription');
            this.setState({page:"prescription"});
        }
        prescriptionHover()
        {this.setState({prescriptionClass: "UpdateDForm-IP-Base UpdateDForm-IP-Mouseover noselect"})}
        prescriptionDefault()
        {
            if(this.state.prescription)
            {
                this.setState({prescriptionClass: "UpdateDForm-IP-Base UpdateDForm-IP-Saved noselect"});
                return;
            }
            this.setState({prescriptionClass: "UpdateDForm-IP-Base UpdateDForm-IP-Default noselect"});
                return;
        }
        prescriptionMousDown()
        {this.setState({prescriptionClass: "UpdateDForm-IP-Base UpdateDForm-IP-Click noselect"})};
    
    Dataexit(arg)
    {
        if(this.state[arg])
        {
            return "Saved";
        }
        return "No Data";
    }

    renderImageAndPrescription(){
        return (
            <div className="UpdateDForm-IP">
                        <div className="UpdateDForm-Item-Name noselect">Images and Prescription:</div>
                        <div className="UpdateDForm-IP-Lower">
                            <div className={this.state.DBleftClass}
                             onClick={this.DBleftClick}
                            onMouseDown={this.DBleftMousDown}
                            onMouseOver={this.DBleftHover}
                            onMouseLeave={this.DBleftDefault}
                             >DR(left)<br/>{this.Dataexit('DBleft')}</div>
                            <div className={this.state.DBrightClass}
                            onClick={this.DBrightClick}
                            onMouseDown={this.DBrightMousDown}
                            onMouseOver={this.DBrightHover}
                            onMouseLeave={this.DBrightDefault}
                             >DR(right)<br/>{this.Dataexit('DBright')}</div>
                            <div className={this.state.prescriptionClass} 
                            onClick={this.prescriptionClick}
                            onMouseDown={this.prescriptionMousDown}
                            onMouseOver={this.prescriptionHover}
                            onMouseLeave={this.prescriptionDefault}
                            >Prescription<br/>{this.Dataexit('prescription')}</div>
                        </div>
                    </div>
        )
    }

    

    renderBase()
    {
        return (
            <div className="UpdateDForm">
                <div className="UpdateDForm-Title">
                    
                    
                    <div className="UpdateDForm-Title-Cancel">
                        <i className="fa fa-times UpdateDForm-Title-Cancel-i" aria-hidden="true" onClick={()=>{
                        this.props.DoctorUpdateForm()
                    }}></i>    
                    </div>
                    <div className="UpdateDForm-Title-Name noselect">New Record</div>
                </div>
                <div className="UpdateDForm-Options">
                    {/*Items starts here*/}

                    <div className="UpdateDForm-FixedItem noselect">ID:{` ${this.state.personal_id}`}</div>
                    <div className="UpdateDForm-FixedItem noselect">Name:{` ${this.state.name}`}</div>
                    <div className="UpdateDForm-FixedItem noselect">DOB:{` ${this.state.birthday}`}</div>
                    <div className="UpdateDForm-FixedItem noselect">Last Visit:{` ${this.state.last_visit}`}</div>

                    <div className="UpdateDForm-Item">
                        <div className="UpdateDForm-Item-Name noselect">Height:</div>
                        <div className="UpdateDForm-Item-Lower">
                            <input className="UpdateDForm-Item-Input "  type="text"name="height" 
                            value={this.state.height}
                            onInput={(e)=>this.setState({height: e.target.value})} />
                            <span className="UpdateDForm-Item-Unit noselect" >cm</span>
                        </div>
                    </div>

                    <div className="UpdateDForm-Item">
                        <div className="UpdateDForm-Item-Name noselect">Weight:</div>
                        <div className="UpdateDForm-Item-Lower">
                            <input className="UpdateDForm-Item-Input"  type="text" name="weight" 
                            value={this.state.weight}
                            onInput={(e)=>this.setState({weight: e.target.value})} />
                            <span className="UpdateDForm-Item-Unit noselect" >kg</span>
                        </div>
                    </div>

                    <div className="UpdateDForm-Item">
                        <div className="UpdateDForm-Item-Name noselect">Blood Sugar:</div>
                        <div className="UpdateDForm-Item-Lower">
                            <input className="UpdateDForm-Item-Input"  type="text"  name="blood_sugar" 
                            value={this.state.blood_sugar}
                            onInput={(e)=>this.setState({blood_sugar: e.target.value})} />
                            <span className="UpdateDForm-Item-Unit" >Un</span>
                        </div>
                    </div>

                    <div className="UpdateDForm-Item">
                        <div className="UpdateDForm-Item-Name noselect">Blood Fat:</div>
                        <div className="UpdateDForm-Item-Lower">
                            <input className="UpdateDForm-Item-Input"  type="text" name="blood_fat" 
                            value={this.state.blood_fat}
                            onInput={(e)=>this.setState({blood_fat: e.target.value})} />
                            <span className="UpdateDForm-Item-Unit" >Un</span>
                        </div>
                    </div>

                    <div className="UpdateDForm-Item">
                        <div className="UpdateDForm-Item-Name noselect">Blood Presure (High):</div>
                        <div className="UpdateDForm-Item-Lower">
                            <input className="UpdateDForm-Item-Input"  type="text" name="blood_pressure_high" 
                            value={this.state.blood_pressure_high}
                            onInput={(e)=>this.setState({blood_pressure_high: e.target.value})} />
                            <span className="UpdateDForm-Item-Unit" >Un</span>
                        </div>
                    </div>

                    <div className="UpdateDForm-Item">
                        <div className="UpdateDForm-Item-Name noselect">Blood Presure (Low):</div>
                        <div className="UpdateDForm-Item-Lower">
                            <input className="UpdateDForm-Item-Input Birthday"  type="text" name="blood_pressure_low" 
                            value={this.state.blood_pressure_low}
                            onInput={(e)=>this.setState({blood_pressure_low: e.target.value})} />
                            <span className="UpdateDForm-Item-Unit noselect" >Un</span>
                        </div>
                    </div>

                    
                    {(()=>{
                        if (sessionStorage.getItem('identity') === 'doctor')
                            return this.renderImageAndPrescription();
                    })()}
                

                    {/*<div className="UpdateDForm-IP">
                        <div className="UpdateDForm-Item-Name noselect">Images and Prescription:</div>
                        <div className="UpdateDForm-IP-Lower">
                            <div className={this.state.DBleftClass}
                             onClick={this.DBleftClick}
                            onMouseDown={this.DBleftMousDown}
                            onMouseOver={this.DBleftHover}
                            onMouseLeave={this.DBleftDefault}
                             >DR(left)<br/>{this.Dataexit('DBleft')}</div>
                            <div className={this.state.DBrightClass}
                            onClick={this.DBrightClick}
                            onMouseDown={this.DBrightMousDown}
                            onMouseOver={this.DBrightHover}
                            onMouseLeave={this.DBrightDefault}
                             >DR(right)<br/>{this.Dataexit('DBright')}</div>
                            <div className={this.state.prescriptionClass} 
                            onClick={this.prescriptionClick}
                            onMouseDown={this.prescriptionMousDown}
                            onMouseOver={this.prescriptionHover}
                            onMouseLeave={this.prescriptionDefault}
                            >Prescription<br/>{this.Dataexit('prescription')}</div>
                        </div>
                    </div>
*/}


                </div>
                <div className="UpdateDForm-Submit">
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

    cancelBack()
    {
        this.setState({page:"base"})
        this.resetButtons();
        this.setState({uniqueID:this.state.uniqueID+1});
    }

    saveInfo(info)
    {
        if(info.prescription)
        {
             this.setState({prescription:true, visits:info.visits});
        }
        if(!info.prescription)
        {if(info.left)
            {
                this.setState({DBleft:true, DR_left_note:info.note, DR_left_photo:info.photo, DR_left_score:info.score});
            }
            if(!info.left)
            {
                this.setState({DBright:true, DR_right_note:info.note, DR_right_photo:info.photo, DR_right_score:info.score});
            }
            
        }
        this.resetButtons();
    }

    resetButtons()
    {
        this.DBleftDefault();
        this.DBrightDefault();
        this.prescriptionDefault();
    }

    render() {
        if(this.state.page == 'base')
        return(
            this.renderBase()
        )
        if(this.state.page == 'LeftDR')
            
            {console.log('LeftPage');
            return(
            <DoctorUpdateDR key = {this.state.uniqueID} left = {true} cancelBack ={this.cancelBack.bind(this)} saveInfo = {this.saveInfo.bind(this)}
            score = {this.state.DR_left_score}
            note = {this.state.DR_left_note}
            photo = {this.state.DR_left_photo}/>
             
        )}
        if(this.state.page == 'RightDR')
        {console.log('RightPage');
        return(
            <DoctorUpdateDR key = {this.state.uniqueID} left = {false} cancelBack = {this.cancelBack.bind(this)} saveInfo = {this.saveInfo.bind(this)}            
            score = {this.state.DR_right_score}
            note = {this.state.DR_right_note}
            photo = {this.state.DR_right_photo}/>
        )}
        if(this.state.page == 'prescription')
        return(
            <DoctorUpdateDrugs key = {this.state.uniqueID} cancelBack = {this.cancelBack.bind(this)} saveInfo = {this.saveInfo.bind(this)} visits = {this.state.visits}/>
        )
    }
        
}

export default DoctorUpdate;
