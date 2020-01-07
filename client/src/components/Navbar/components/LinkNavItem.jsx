import React from 'react';
import { NavItem } from 'reactstrap';
import { StyledNavLink } from './'

function LinkNavItem(props) {
  const { option } = props;
  return (
    <NavItem onClick={props.onClick}>
      <StyledNavLink href={option.route}>{option.name}</StyledNavLink>
    </NavItem>
  );
}

export default LinkNavItem;
