import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import './styles.scss'

const Wrapper = styled.div`
  margin: ${({theme}) => 2*theme.unit.medium}px 0px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

export function TabContainer(props) {
  const [activeTab, setActiveTab] = useState(0);
  const toggle = (selectedTab) => {
    if (selectedTab !== activeTab) setActiveTab(selectedTab);
  }
  const titles = props.children.map(child => child.props.title);
  
  return (
    <Wrapper>
      <TabHeader activeTab={activeTab} titles={titles} toggle={toggle}/>
      <TabInfo activeTab={activeTab} children={props.children} />
    </Wrapper>
  );
}

export function TabHeader(props) {
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

export function TabInfo(props) {
  return (
    <SwipeableViews index={props.activeTab} onChangeIndex={props.toggle}>
      {props.children}
    </SwipeableViews>
  );
}
