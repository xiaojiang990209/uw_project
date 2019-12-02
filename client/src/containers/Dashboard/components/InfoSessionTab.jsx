import cuid from 'cuid';
import _ from 'lodash';
import React from 'react'
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  ListGroupItem,
  UncontrolledCollapse } from 'reactstrap';
import styled from 'styled-components';
import BaseTab from '../hocs/BaseTab';
import { fetchInfoSessions } from '../../../ducks/uw';
import Button from '../../../components/Button';

const Bold = styled.span`
  font-weight: bold;
`;

const ListParagraphItem = styled.p`
  margin: ${({theme}) => theme.unit.small}px;
`;

const renderInfoSession = (infoSessions, index, key) => {
  const infoSession = infoSessions[index];
  const id = cuid();
  return (
    <ListGroupItem key={key}>
      <Button id={id} block>
        <ListParagraphItem>{infoSession.date}</ListParagraphItem>
        <ListParagraphItem>{infoSession.employer}</ListParagraphItem>
      </Button>
      <UncontrolledCollapse toggler={`#${id}`}>
        <Card>
          <CardBody>
            <CardTitle>
              <Bold>Date: </Bold>
              {infoSession.date} @ {infoSession.start_time} - {infoSession.end_time}
            </CardTitle>
            <CardSubtitle>
              <Bold>Location: </Bold>
              {_.isEmpty(infoSession.location.trim()) ? "N/A" : infoSession.location}
            </CardSubtitle>
            <hr/>
            <CardText>
              {
                _.isEmpty(infoSession.website) ?
                  <Bold>Description:</Bold> :
                  infoSession.website.startsWith("http") ?
                    <a href={infoSession.website}><Bold>Description:</Bold></a> :
                    <a href={`//${infoSession.website}`}><Bold>Description:</Bold></a>
              }
              <br/>
              {_.isEmpty(infoSession.description) ? "N/A" : infoSession.description}
            </CardText>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    </ListGroupItem>
  );
}

export default BaseTab(fetchInfoSessions, null, renderInfoSession);