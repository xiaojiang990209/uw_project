import React, { Component } from 'react';
import './Menu.css';
import options from './Options';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MenuItem from '../MenuItem/MenuItem'

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <div className="button">
            <FontAwesomeIcon icon={faBars} size="lg"/>
        </div>
        <div className="options">
            {options.map((option,i) =>
                <MenuItem key={i} option={option} />
            )}
        </div>
      </div>
    );
  }
}

export default Menu;
