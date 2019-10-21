import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import "./Navbar.css";
  
export default (props) => (
    <Menu disableAutoFocus width={ 256 }>
      {props.options.map(({ route, name }) => (
        <Link to={route}>{name}</Link>
      ))}
    </Menu>
)
