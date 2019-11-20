import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { withTheme } from 'styled-components';
import { Wrapper } from './components';
import './Navbar.css';

const Navbar = (props) => (
  <Wrapper>
    <Menu disableAutoFocus width={4 * props.theme.unit.large}>
      {props.options.map((val, index) => (
        <Link key={index} to={val.route}>
          {val.name}
        </Link>
      ))}
    </Menu>
  </Wrapper>
);

export default withTheme(Navbar);
