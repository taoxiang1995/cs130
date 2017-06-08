import React, { Component } from 'react';
import './style.css';
import {Link} from 'react-router';

class Logo extends Component {
    render() {
        return (
            <div className="logo-component">
                <Link to="login" >
                    <button className="btn btn-primary btn-logo">
                        <div>Vx</div>
                    </button>
                </Link>
            </div>
        );
    }
}

export default Logo;