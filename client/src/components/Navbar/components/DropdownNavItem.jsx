import React from 'react';
import { UncontrolledDropdown } from "reactstrap";
import {
  StyledDropdownToggle,
  StyledDropdownMenu,
  StyledDropdownItem,
  StyledNavLink
} from './';
import { connect } from 'react-redux';
import { logoutUser } from "../../../ducks/session";

function DropdownNavItem({history, option, userName, userEmail, ...props}) {

  return (
    <UncontrolledDropdown nav inNavbar>
      <StyledDropdownToggle nav caret={!option.isUserAvatar}>
        {option.isUserAvatar ? <div>{userName}</div>  : option.name }
      </StyledDropdownToggle>
      <StyledDropdownMenu right={option.isUserAvatar}>
        {option.isUserAvatar &&
        <StyledDropdownItem disabled>
          <StyledNavLink disabled>{userEmail}</StyledNavLink>
        </StyledDropdownItem>}
        {option.nested.map((nestedOption, idx) => (
          <StyledDropdownItem key={idx}>
            <StyledNavLink href={nestedOption.route}>{nestedOption.name}</StyledNavLink>
          </StyledDropdownItem>
        ))}
        {option.isUserAvatar &&
        <StyledDropdownItem onClick={() => {props.logoutUser(history);}}>
          <StyledNavLink>Logout</StyledNavLink>
        </StyledDropdownItem>}
      </StyledDropdownMenu>
    </UncontrolledDropdown>
  );
}


const mapStateToProps = (state) => ({
  userName: state.session.user&&state.session.user.name,
  userEmail: state.session.user&&state.session.user.email,
});

const mapDispatchToProps = ({
  logoutUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownNavItem);
