import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../ducks/session';
import {
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown
} from 'reactstrap';
import {
  StyledDropdownMenu,
  StyledDropdownItem,
  StyledDropdownToggle,
  StyledNavbar,
  StyledNavbarBrand,
  StyledNavLink
} from './components';

function Navbar(props) {
  const { options, isAuthenticated, logoutUser } = props;

  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);

  const canShow = (option) => !option.private || isAuthenticated;

  const toNavItem = (option, idx) => {
    if (option.nested) {
      return (
        canShow(option) && <UncontrolledDropdown nav inNavbar key={idx}>
          <StyledDropdownToggle nav caret>
            {option.name}
          </StyledDropdownToggle>
          <StyledDropdownMenu>
            {option.nested.map((nestedOption, idx) => (
              canShow(nestedOption) && <StyledDropdownItem key={idx}>
                <StyledNavLink href={nestedOption.route}>{nestedOption.name}</StyledNavLink>
              </StyledDropdownItem>
            ))}
          </StyledDropdownMenu>
        </UncontrolledDropdown>
      )
    }
    return (
      canShow(option) && <NavItem key={idx}>
        <StyledNavLink href={option.route}>{option.name}</StyledNavLink>
      </NavItem>
    );
  }

  return (
    <StyledNavbar light expand="md">
      <StyledNavbarBrand href='/'>UWAssisT</StyledNavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {options.map(toNavItem)}
          {isAuthenticated && <NavItem onClick={() => logoutUser(props.history)}>
            <StyledNavLink href="#">
              Sign out
            </StyledNavLink>
          </NavItem>}
        </Nav>
      </Collapse>
    </StyledNavbar>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.session.isAuthenticated
});

const mapDispatchToProps = ({
  logoutUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
