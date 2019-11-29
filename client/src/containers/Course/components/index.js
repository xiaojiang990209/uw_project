import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'

export const Wrapper = styled.div`
  min-height: 100%;
  width: 85%;
  margin: 0px auto;
`;

export const TextWrapper = styled.div`
  font-size: 14px;
`;

export const BoldTitle = styled.p`
  font-weight: bold;
  margin: ${({ theme }) => 0.5 * theme.unit.small}px 0px;
`;

export const MarginWrapper = styled.div`
  margin: ${({ theme }) => 4 * theme.unit.small}px auto;
`;

export const SolidHeart = (props) => (
  <span onClick={props.onClick}><FontAwesomeIcon icon={faHeart} pull="right" size="lg" style={{ color: "red"}} /></span>
);

export const HollowHeart = (props) => (
  <span onClick={props.onClick}><FontAwesomeIcon icon={faHeartOutline} pull="right" size="lg" style={{ color: "red"}} /></span>
);