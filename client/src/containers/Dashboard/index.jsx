import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../ducks/session';
import Weather from '../../components/Weather';
import TabContainer from '../../components/Tab/TabContainer';
import NewsTab from './components/NewsTab';
import InfoSessionTab from './components/InfoSessionTab';

function Dashboard(props) {
  return (
    <>
      <Weather />
      <TabContainer>
        <NewsTab title="What's around Campus"/>
        <InfoSessionTab title="Upcoming Info Session"/>
      </TabContainer>
    </>
  );
}

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
