import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DoughnutChart from '../Components/data_charts/doughnut';
import BloodStatLineChart from '../Components/data_charts/line';
import LargeNameCard from '../Components/large_patient_card';
import NameCard from '../Pages/PatientsRecord/NameCard';
import PatientSignUp from '../Components/patient_sign_up';
import PatientUpdate from '../Components/patient_update';
import DoctorUpdate from '../Components/doctor_update';
import DoctorUpdateDR from '../Components/doctor_update_DR';
import DoctorUpdateDrugs from '../Components/doctor_update_drugs';
import DrugEdit from '../Components/drug_edit';
import Login from '../Pages/LoginPage/Login';
import Add from '../Components/Add';
import SearchBar from '../Components/SearchBar';
import {Card_create_group, Card_group} from '../Components/patient_group_card';
import EmailForm from '../Components/EmailForm';
import AdjustableBloodStatLineChart from '../Components/data_charts/adjustable_multi_line';
import SideBar from "../Components/SideBar"
import '../styleSheet/bootstrap/css/bootstrap.css';
import '../styleSheet/font-awsome/css/font-awesome.css';


storiesOf('Charts', module)
  .add('Age Doughnut Chart', () => (
    <DoughnutChart/>
  ));


storiesOf('Charts', module)
  .add('Blood Line Chart', () => (
    <BloodStatLineChart/>
  ))
  .add('Adjustable Blood Line Chart', () => (
    <AdjustableBloodStatLineChart title="Some Title"/>
  ));

storiesOf('NameCard', module)
  .add('NameCardExample', () => (
    <NameCard
      name='xiaomin'
      id='1323123'
      birthday="1995/11/24"
      age={18}
      blood_sugar={0.5}
      blood_fat={0.4}
      blood_pressure_high={180}
      blood_pressure_low={70}
    />
  ))

storiesOf('NameCard', module)
  .add('Large Namecard', () => (
    <LargeNameCard/>
  ))
  .add('Create Patient Group', () =>(
    <Card_create_group/>
  ))
  .add('Created Patient Group', () =>(
    <Card_group/>
  ))

  storiesOf('PatientSignUp', module)
  .add('PatientSignUp', () => (
    <PatientSignUp/>
  ))

  storiesOf('PatientUpdate', module)
  .add('PatientUpdate', () => (
    <PatientUpdate/>
  ))

  storiesOf('DoctorUpdate', module)
  .add('DoctorUpdate', () => (
    <DoctorUpdate/>
  ))
  
    storiesOf('DoctorUpdateDR', module)
  .add('DoctorUpdateDR', () => (
    <DoctorUpdateDR/>
  ))

  storiesOf('DoctorUpdateDrugs', module)
  .add('DoctorUpdateDrugs', () => (
    <DoctorUpdateDrugs/>
  ))


  storiesOf('DrugEdit', module)
  .add('DrugEdit', () => (
    <DrugEdit/>
  ))


storiesOf('Login', module)
  .add('Login', () => (
    <Login/>
))

storiesOf('SearchBar', module)
.add('SearchBar Example', ()=>(
    <SearchBar/>
))
.add('Side Bar', ()=>(
  <SideBar/>
))

storiesOf('Add Button', module)
  .add('Example', ()=>(
    <Add/>
))

storiesOf('Email Form', module)
  .add('Example', ()=>(
    <EmailForm/>
))