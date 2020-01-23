import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../ducks/session';
import {
  Collapse,
  NavbarToggler,
  Nav,
} from 'reactstrap';
import {
  StyledNavbar,
  StyledNavbarBrand,
} from './components';
import DropdownNavItem from './components/DropdownNavItem';
import LinkNavItem from './components/LinkNavItem';
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity } from '@fortawesome/free-solid-svg-icons';

function Navbar(props) {
  const { options, isAuthenticated, logoutUser, userName } = props;
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);

  const canShow = (option) => !option.private || isAuthenticated;

  const convertToNavItem = (option, idx) => (
    canShow(option) && (
      option.nested ?
        <DropdownNavItem key={idx} option={{...option, nested: option.nested.filter(canShow)}} /> :
        <LinkNavItem key={idx} option={option} />
    )
  );

  return (
    <StyledNavbar light expand="md">
      <StyledNavbarBrand href='/'>UWAssisT</StyledNavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {options.map(convertToNavItem)}
        </Nav>
      </Collapse>
    </StyledNavbar>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.session.isAuthenticated,
});



export default connect(
  mapStateToProps,
)(Navbar);
