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
    box-shadow: 0px 8px 20px rgba(50, 50, 50, 0.1) ;
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

const StyledPostImage = styled.img`
  height: 150px;
  margin: ${({theme}) => 2*theme.unit.small}px;
`;

export const FBPostCard = (props) => (
  <StyledLink href={props.post_url} target='__blank'>
    <Card>
      {props.title && <StyledTitle>{props.title}</StyledTitle>}
      <StyledSubtitle>Posted on {props.published_at}</StyledSubtitle>
      {props.price && <StyledSubtitle>{props.price}</StyledSubtitle>}
      {props.content && <Content>{props.content}</Content>}
      {props.photos.map((url, idx) => (
        <StyledPostImage key={idx} src={url} alt="post_pic" />
      ))}
    </Card>
  </StyledLink>
)

