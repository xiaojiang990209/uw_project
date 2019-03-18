import React, { Component } from 'react';
import './Course.css';
import options from './Options.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MenuItem from '../MenuItem/MenuItem.js'

class Course extends Component {
  render() {
    return (
      <div className="menu">
        <div className="button">
            <FontAwesomeIcon icon={faBars} size="lg"/>
        </div>
        <div className="options">
            {options.map((option,i) =>
                <MenuItem key={i} optionName={option} />
            )}
        </div>
      </div>
    );
  }
}

export default Course;
