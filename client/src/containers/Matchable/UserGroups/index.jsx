import React from "react";
import { connect } from 'react-redux';
import { getMyGroups } from "../../../ducks/matchable";
import MatchableGroupList from '../component/MatchableGroupList';
import {renderCourseGroups} from '../MatchableGroups/MatchableCourseGroup';

const UserMatchableGroups = ({userId}) =>
  (
    <MatchableGroupList
      header="Joined Study Groups"
      getGroups={() => getMyGroups(userId)}
      renderer={renderCourseGroups}
    />
    );

const mapStateToProps = (state) => ({
  userId: state.session.user.id,
});

export default connect(
  mapStateToProps
)(UserMatchableGroups);