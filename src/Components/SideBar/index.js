import React, { Component } from 'react';
import Logo from '../../Components/Logo';
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
            </div>
        );
    }
}

export default SideBar;