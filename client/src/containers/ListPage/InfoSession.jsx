import _ from 'lodash';
import React from 'react'
import { Container } from 'reactstrap';
import ListPage from '../../components/ListPage';
import { fetchInfoSessions } from '../../ducks/uw';
import { InfoSessionCard, StyledListGroupItem } from './components';

const renderInfoSession = (infoSessions, index, key) => {
  const infoSession = infoSessions[index];
  // title, date, location, description
  const date = `${infoSession.date} @ ${infoSession.start_time} - ${infoSession.end_time}`;
  const location = _.isEmpty(infoSession.location.trim()) ? null : infoSession.location;
  const description = _.isEmpty(infoSession.description) ? null : infoSession.description;
  return (
    <StyledListGroupItem key={key}>
      <InfoSessionCard
        title={infoSession.employer}
        date={date}
        location={location}
        description={description}
        link={infoSession.link}
      />
    </StyledListGroupItem>
  );
}

function InfoSessionTab(props) {
  const InfoSessionComponent = ListPage(fetchInfoSessions, null, renderInfoSession);
  return (
    <Container>
      <br/>
      <h4>Choose from the following employer info sessions</h4>
      <hr/>
      <InfoSessionComponent />
    </Container>
  )
}

export default InfoSessionTab;
