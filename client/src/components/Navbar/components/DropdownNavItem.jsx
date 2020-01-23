import React from 'react';
import { UncontrolledDropdown } from "reactstrap";
import {
  StyledDropdownToggle,
  StyledDropdownMenu,
  StyledDropdownItem,
  StyledNavLink
} from './';
import Avatar from "react-avatar";
import { connect } from 'react-redux';
import LinkNavItem from "./LinkNavItem";
import { logoutUser } from "../../../ducks/session";

function DropdownNavItem({option, userName, userEmail, ...props}) {
  const signOutOption = ({ route: '#', name: 'Logout' });

  return (
    <UncontrolledDropdown nav inNavbar>
      <StyledDropdownToggle nav caret={!option.isUserAvatar}>
        {option.isUserAvatar ? <Avatar style={{'margin': '6px 0 0 2px'}} name={userName} size="35" round/>  : option.name }
      </StyledDropdownToggle>
      <StyledDropdownMenu>
        {option.isUserAvatar &&  <StyledNavLink disabled>{userEmail}</StyledNavLink>}
        {option.nested.map((nestedOption, idx) => (
          <StyledDropdownItem key={idx}>
            <StyledNavLink href={nestedOption.route}>{nestedOption.name}</StyledNavLink>
          </StyledDropdownItem>
        ))}
        {option.isUserAvatar && <ul><LinkNavItem option={signOutOption} onClick={() => logoutUser(props.history)}/></ul>}
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
