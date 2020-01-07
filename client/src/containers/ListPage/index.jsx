import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../ducks/session';
import TabContainer from '../../components/Tab/TabContainer';
import FavouriteCourseTab from './components/FavouriteCourseTab';

function Dashboard(props) {
  return (
    <>
      <TabContainer>
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
