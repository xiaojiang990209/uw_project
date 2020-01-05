import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Title, Subtitle, Content } from '../../../components/Card';
import { ListGroupItem } from 'reactstrap';

const StyledTitle = styled(Title)`
  font-size: 1.3rem;
  line-height: normal;
`;

const StyledSubtitle = styled(Subtitle)`
  margin-top: ${({theme}) => 2*theme.unit.small}px;
`;

const StyledLink = styled.a`
  color: #000;
  &:hover {
    color: #000;
    text-decoration: none;
  }
  &:hover ${Card} {
    background-color: #e9e9e9;
  }
`;

export const StyledListGroupItem = styled(ListGroupItem)`
  border: none;
`;

export const NewsCard = (props) => (
  <StyledLink href={props.link} target='__blank'>
    <Card>
      <StyledTitle>{props.title}</StyledTitle>
      <StyledSubtitle>{props.subtitle}</StyledSubtitle>
    </Card>
  </StyledLink>
);

export const InfoSessionCard = (props) => (
  <StyledLink href={props.link} target='__blank'>
    <Card>
      <StyledTitle>{props.title}</StyledTitle>
      <StyledSubtitle>{props.date}</StyledSubtitle>
      {props.location && <StyledSubtitle>{props.location}</StyledSubtitle>}
      {props.description && <Content>{props.description}</Content>}
    </Card>
  </StyledLink>
);

export const FavouriteCourseCard = (props) => (
  <Link to={props.link} style={{ textDecoration: 'none', color: '#000' }}>
    <Card>
      <Title>{props.title}</Title>
    </Card>
  </Link>
);

