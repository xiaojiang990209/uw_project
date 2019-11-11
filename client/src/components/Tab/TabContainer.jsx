import React, { useState } from 'react';
import styled from 'styled-components';
import TabHeader from './TabHeader';
import TabInfo from './TabInfo';

const Wrapper = styled.div`
  margin: ${({theme}) => 2*theme.unit.medium}px 0px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

export default function TabContainer(props) {
  const [activeTab, setActiveTab] = useState(0);
  const toggle = (selectedTab) => {
    if (selectedTab !== activeTab) setActiveTab(selectedTab);
  }
  const titles = [];
  React.Children.forEach(props.children, elem => {
    titles.push(elem.props.title);
  });

  return (
    <Wrapper>
      <TabHeader activeTab={activeTab} titles={titles} toggle={toggle}/>
      <TabInfo activeTab={activeTab} children={props.children} />
    </Wrapper>
  );
}