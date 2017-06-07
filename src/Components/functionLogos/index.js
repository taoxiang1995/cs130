import React, { Component } from 'react';
import './style.css';
import {Link} from 'react-router';

export class LogoPatientRecords extends Component {
    render() {
        return (
            <div className="logo-component">
                <Link to="Demography" >
                    <button className="btn btn-primary btn-logo"
                        id="recs">
                        <div>Rec</div>
                    </button>
                </Link>
            </div>
        );
    }
}

export class LogoDemography extends Component {
    render() {
        return (
            <div className="logo-component">
                <Link to="Demography" >
                    <button className="btn btn-primary btn-logo"
                        id="dem">
                        <div>Dem</div>
                    </button>
                </Link>
            </div>
        );
    }
}

export class LogoCompare extends Component {
    render() {
        return (
            <div className="logo-component">
                <Link to="Demography" >
                    <button className="btn btn-primary btn-logo"
                        id="cmp">
                        <div>Cmp</div>
                    </button>
                </Link>
            </div>
        );
    }
}