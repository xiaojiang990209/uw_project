import React from 'react';
import { UncontrolledDropdown } from 'reactstrap';
import {
  StyledDropdownToggle,
  StyledDropdownMenu,
  StyledDropdownItem,
  StyledNavLink
} from './';

function DropdownNavItem(props) {
  const { option } = props;
  return (
    <UncontrolledDropdown nav inNavbar>
      <StyledDropdownToggle nav caret>
        {option.name}
      </StyledDropdownToggle>
      <StyledDropdownMenu>
        {option.nested.map((nestedOption, idx) => (
          <StyledDropdownItem key={idx}>
            <StyledNavLink href={nestedOption.route}>{nestedOption.name}</StyledNavLink>
          </StyledDropdownItem>
        ))}
      </StyledDropdownMenu>
    </UncontrolledDropdown>
  );
}

export default DropdownNavItem;
