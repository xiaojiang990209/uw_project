import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../ducks/session';
import Weather from '../../components/Weather';
import TabContainer from '../../components/Tab/TabContainer';
import NewsTab from './components/NewsTab';
import InfoSessionTab from './components/InfoSessionTab';
import FavouriteCourseTab from './components/FavouriteCourseTab';

function Dashboard(props) {
  return (
    <>
      <Weather />
      <TabContainer>
        <NewsTab title="What's around Campus"/>
        <InfoSessionTab title="Upcoming Info Session"/>
        <FavouriteCourseTab title="Favourite Courses"/>
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
