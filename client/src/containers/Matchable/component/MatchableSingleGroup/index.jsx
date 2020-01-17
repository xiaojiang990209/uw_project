import React from 'react';
import Avatar from 'react-avatar';
import ReactList from 'react-list';
import { Link } from 'react-router-dom';
import { Card, Title, Subtitle, Content } from '../../../../components/Card';
import { JoinButton, StyledUsername, MemberScroll } from './components';
import { StyledSubtitle, StyledListGroupItem } from '../index';


export const MatchableSubjectGroupCard = (props) => (
  <Link to={props.link} style={{ textDecoration: 'none', color: '#000' }}>
    <Card>
      <Title>{props.subject}</Title>
      <Subtitle>{`${props.count} ${props.count > 1 ? 'current groups' : 'current group'}`}</Subtitle>
    </Card>
  </Link>
);

export const MatchableGroupCard = (props) => (
  <Link to={props.link} style={{ textDecoration: 'none', color: '#000' }}>
    <Card>
      <Title>{props.name}</Title>
      {props.course && <StyledSubtitle>{props.course}</StyledSubtitle>}
      <StyledSubtitle>{props.date}</StyledSubtitle>
      {props.location && <StyledSubtitle>{props.location}</StyledSubtitle>}
      {props.description && <Content detail>{props.description}</Content>}
    </Card>
  </Link>
);



export const MatchableGroupDisplayCard = (props) => {
  //TODO: if user is joined, then leave group
  //TODO: do not let join if group is full
  console.log(props);
  return (
  <Card>
      <JoinButton onClick={()=>{}}>Join Group</JoinButton>
      <Title>{props.name}</Title>
      {props.course && <StyledSubtitle>{props.course}</StyledSubtitle>}
      <StyledSubtitle>{props.date}</StyledSubtitle>
      {props.location && <StyledSubtitle>{props.location}</StyledSubtitle>}

      <StyledSubtitle>{`Member count: ${props.users.length} / ${props.size}`}</StyledSubtitle>
      {props.description && <Content detail>{props.description}</Content>}
      <hr/>
      <Subtitle>Members</Subtitle>
    <MemberScroll>
      <Subtitle></Subtitle>
      <ReactList length={props.users.length} itemRenderer={(idx, key) => (
        <StyledListGroupItem key={key} style={{ border: 'none' }}>
          <Avatar name={props.users[idx].name} size="50" round/>
          <StyledUsername>{props.users[idx].name}</StyledUsername>
        </StyledListGroupItem>
      )} />
    </MemberScroll>
    <hr/>
    <Subtitle>Posts</Subtitle>
    <Subtitle></Subtitle>
  </Card>
)};
