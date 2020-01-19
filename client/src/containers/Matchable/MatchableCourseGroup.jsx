import React from 'react'
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { getGroups } from '../../ducks/matchable';
import ListPage from '../../components/ListPage';
import { MatchableGroupCard,  } from './MatchableSingleGroup';
import {StyledListGroupItem } from './component';

const renderCourseGroups = (listings, index, key) => {
  const listing = listings[index];
  const coeff = 1000 * 60 * 5;
  const course = listing.subject && listing.courseId ?
    `${listing.subject} ${listing.courseId}` :
    null;

  return (
    <StyledListGroupItem key={key}>
      <MatchableGroupCard
        link={`/matchable/groups/${listing._id}`}
        name={listing.groupName}
        course={course}

        date={new Date(Math.round(listing.time / coeff) * coeff).toLocaleString('en-CA')}
        location={listing.location}
        description={listing.description}/>
    </StyledListGroupItem>
  );
};

function MatchableCourseGroup(props) {
  const { subject } = props.match.params;
  const MatchableCourseGroupComponent = ListPage(
    () => getGroups(subject, props.userId), null, renderCourseGroups);
  return (
    <Container>
      <br/>
      <h4>{`Here's the current ${subject} study groups`}</h4>
      <hr/>
      <MatchableCourseGroupComponent />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  userId: state.session.user.id
});

export default connect(
  mapStateToProps,
  null
)(MatchableCourseGroup);
