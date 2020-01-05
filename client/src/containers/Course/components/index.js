import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'

import { Card, Title, Subtitle, Content } from '../../../components/Card';

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

const SolidHeart = (props) => (
  <span onClick={props.onClick}><FontAwesomeIcon icon={faHeart} pull="right" size="lg"/></span>
);

const HollowHeart = (props) => (
  <span onClick={props.onClick}><FontAwesomeIcon icon={faHeartOutline} pull="right" size="lg"/></span>
);

export const InfoCard = (props) => (
  <Card onClick={props.onClick}>
    <Title>{props.title}</Title>
    <Subtitle>{props.subtitle}</Subtitle>
    <Content>{props.content}</Content>
  </Card>
)

export const SubjectCard = (props) => (
  <Card onClick={props.onClick}>
    <Title>{props.title}</Title>
    <Subtitle>{props.subtitle}</Subtitle>
    <Content>{props.content}</Content>
  </Card>
);

export const DetailCard = (props) => (
  <Card>
    <Title>
      {props.title}
      {props.showFavourite && (props.isFavourite ?
        <SolidHeart onClick={props.onFavouriteClicked} /> :
        <HollowHeart onClick={props.onFavouriteClicked} />)}
    </Title>
    <Subtitle>{props.subtitle}</Subtitle>
    <Content detail>{props.content}</Content>
    <br/>
    <Subtitle>Prerequisites</Subtitle>
    <Content>{props.prerequisites || 'None'}</Content>
    <br/>
    <Subtitle>Antirequisites</Subtitle>
    <Content>{props.antirequisites || 'None'}</Content>
  </Card>
);

