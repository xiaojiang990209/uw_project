import cuid from 'cuid';
import _ from 'lodash';
import React from 'react'
import {
  Button,
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

// {
//   "employer": "Capital One - Tech Roles",
//   "date": "2020-01-07",
//   "start_time": "17:00",
//   "end_time": "19:00",
//   "description": "Capital One is more than you think. We're a data-driven tech company that just happens to do credit cards. We focus on customer-first solutions, and we're united with this common goal. We have all the advantages of a startup, with the resources of a big company. Working here means you're curious and an innovative spirit will be encouraged as you push boundaries and try new things. Our environment is creative and filled with teams that are passionate about the dynamic work they're doing. At Capital One, your career is nurtured and supported. We're ahead of other banks in tech and we want to keep it that way.Come hear all about the internship opportunities at Capital One - food and drink will be provided!",
//   "website": "capitalonecareers.ca/",
//   "location": "DC Corporate Lounge 1301",
//   "link": "http://www.ceca.uwaterloo.ca/students/hiresessions_details.php?id=6552"
// },

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
      <Button color="primary" id={id} block>
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

export default BaseTab(fetchInfoSessions, renderInfoSession);