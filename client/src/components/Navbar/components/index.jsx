import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Navbar,
  NavbarBrand,
  NavLink
} from 'reactstrap';
import styled, { keyframes } from "styled-components";

export const StyledNavbar = styled(Navbar)`
  margin: ${({theme}) => theme.unit.medium}px auto;
`;

export const StyledNavbarBrand = styled(NavbarBrand)`
  font-family: 'Permanent Marker', cursive;
  font-size: 32px;
  line-height: 30px;
  display: flex;
  align-items: center;
  color: #000;
  &:hover {
    color: #000;
  }
`;

export const StyledNavLink = styled(NavLink)`
  color: #000;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

export const StyledDropdownToggle = styled(DropdownToggle)`
  color: #000;
  font-size: 16px;
  margin-right: 3px;
  display: flex;
  align-items: center;
`;

const FadeDownKeyframes = keyframes`
  from {
     transform: translate3d(0, 8px, 0);
    opacity: 0;
    }
   to {
       transform: translate3d(0, 0, 0);
    opacity: 1;
    }
`;

export const StyledDropdownMenu = styled(DropdownMenu)`
  outline: none !important;
  animation: ${FadeDownKeyframes} ${({ length = 0.3 }) => length}s ease-in-out;
  top: 75%;
  min-width: 0px;
`;

export const StyledDropdownItem = styled(DropdownItem)`
  padding: 0px ${({theme}) => theme.unit.small}px;
  outline: none !important;
  &:active {
    background-color:  ${({disabled}) => !disabled && '#e7e7e7'};
  }
`;
