import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './styles.scss'

export default function TabHeader(props) {
  return (
    <Nav tabs>
      {props.titles.map((title, i) => (
        <NavItem key={i}>
          <NavLink onClick={() => props.toggle(i)} active={props.activeTab === i}>
          {title}
          </NavLink>
        </NavItem>))}
    </Nav>
  );
}