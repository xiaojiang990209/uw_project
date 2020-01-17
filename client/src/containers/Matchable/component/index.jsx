import React from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import ReactList from 'react-list';
import { Link } from 'react-router-dom';
import { Button, Card as RCard, Modal, ModalBody, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
import { Card, Title, Subtitle, Content } from '../../../components/Card';

export const StyledFormGroup = styled(FormGroup)`
  margin-bottom: ${({theme}) => 1.5 * theme.unit.medium}px;
`;

export const FormWrapper = styled.div`
  width: 90%;
  margin: 0px auto;
  padding: ${({theme}) => theme.unit.medium}px;
  font-size: 16px;
`;

export const StyledModal = styled(Modal)`
  max-width: 768px;
`

export const StyledModalBody = styled(ModalBody)`
  padding: ${({theme}) => 2 * theme.unit.small}px;
`

export const StyledBookingTable = styled.div`
  overflow-x: scroll;
`;

export const StyledButton = styled(Button)`
  margin-top: ${({theme}) => theme.unit.medium}px;
`;

export const StyledCard = styled(RCard)`
  margin: ${({theme}) => 2 * theme.unit.small}px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 3px 6px rgba(0,0,0,0.23);
`;

export const StyledGroupResultWrapper = styled.div`
  max-height: 70vh;
  overflow: auto;
`;

export const StyledListGroupItem = styled(ListGroupItem)`
  border: none;
  background: transparent;
`;

export const MatchableSubjectGroupCard = (props) => (
  <Link to={props.link} style={{ textDecoration: 'none', color: '#000' }}>
    <Card>
      <Title>{props.subject}</Title>
      <Subtitle>{`${props.count} ${props.count > 1 ? 'current groups' : 'current group'}`}</Subtitle>
    </Card>
  </Link>
);

const StyledSubtitle = styled(Subtitle)`
  margin-top: ${({theme}) => 1.5*theme.unit.small}px;
`;

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

const StyledUsername = styled.div`
  display: inline-block;
  font-size: 1.2rem;
  vertical-align: middle;
  margin-left: ${({theme}) => theme.unit.medium}px;
`;

export const MatchableGroupDisplayCard = (props) => (
  <Card>
      <Title>{props.name}</Title>
      {props.course && <StyledSubtitle>{props.course}</StyledSubtitle>}
      <StyledSubtitle>{props.date}</StyledSubtitle>
      {props.location && <StyledSubtitle>{props.location}</StyledSubtitle>}
      <StyledSubtitle>{`Member count: ${props.users.length} / ${props.size}`}</StyledSubtitle>
      {props.description && <Content detail>{props.description}</Content>}
      <hr/>
      <Subtitle>Members</Subtitle>
      <Subtitle></Subtitle>
      <ReactList length={props.users.length} itemRenderer={(idx, key) => (
        <StyledListGroupItem key={key} style={{ border: 'none' }}>
          <Avatar name={props.users[idx].name} size="50" round/>
          <StyledUsername>{props.users[idx].name}</StyledUsername>
        </StyledListGroupItem>
      )} />
  </Card>
);
