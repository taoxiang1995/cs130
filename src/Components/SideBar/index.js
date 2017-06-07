import React, { Component } from 'react';
import Logo from '../../Components/Logo';
import {LogoPatientRecords, LogoDemography, LogoCompare} from '../../Components/functionLogos';
import './style.css';

class SideBar extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="SideBar">
                <div className="Icon">
                    <Logo/>
                </div>
                <div className="Icon">
                    <LogoPatientRecords/>
                </div>
                <div className="Icon">
                    <LogoDemography/>
                </div>
                <div className="Icon">
                    <LogoCompare/>
                </div>
            </div>
        );
    }
}

export default SideBar;