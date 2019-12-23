import React from 'react';
import './style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"

export default function Navbar() {
    return (

            <div className='navbar'>
                <Link to='/' className='navbar-link'>Home</Link>
                <Link to='/profile' className='navbar-link'>Profile</Link>
            </div>


            
    )
}
