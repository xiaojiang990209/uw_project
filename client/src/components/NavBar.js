import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return(
            <div className='navbar-fixed'>
                <nav className='z-depth-0'>
                    <div className='nav-wrapper blue'>
                        <Link to='/' style={{fontFamily: 'monospace', paddingLeft: '250px'}}
                            className='col s5 brand-logo left black-text'>
                            <i className='material-icons'>code</i>
                            UW-Project
                        </Link>
                        <ul style={{paddingRight: '250px'}} className="right hide-on-med-and-down">
                            <li><Link to='/matchable'>Matchable</Link></li>
                            <li><Link to='/courses'>Courses</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar;