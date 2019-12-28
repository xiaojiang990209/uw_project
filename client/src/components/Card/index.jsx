import React from 'react';
import { StyledWrapper, Title, Subtitle, Content } from './components';

function Card(props) {
  return (
    <StyledWrapper color={props.color} onClick={props.onClick}>
      {props.children}
    </StyledWrapper>
  );
}

export {
  Card, Title, Subtitle, Content
};

