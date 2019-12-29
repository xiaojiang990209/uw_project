import React from 'react';
import styled from 'styled-components';

export const Card = styled.div`
  background: ${({theme}) => theme.color.secondary};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: ${({theme}) => 6*theme.unit.small}px;
`;

export const Title = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  margin: 0px;
`;

export const Subtitle = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;

  display: flex;
  align-items: center;

  color: rgba(0, 0, 0, 0.4);

  margin: 0px;
  margin-top: ${({theme}) => 0.5*theme.unit.small}px;
`;

const FullContent = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  margin: 0px;
  margin-top: ${({theme}) => 2*theme.unit.small}px;
`;

const EllipsisContent = styled(FullContent)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const Content = (props) => (
  props.detail ?
    <FullContent>{props.children}</FullContent> :
    <EllipsisContent>{props.children}</EllipsisContent>
);

