import React from 'react'
import { connect } from 'react-redux';
import { getGroups } from '../../../ducks/matchable';
import { StyledListGroupItem, StyledSubtitle } from "../component";
import MatchableGroupList from "../component/MatchableGroupList";
import { Link } from "react-router-dom";
import { Card, Content, Title } from "../../../components/Card";

export const MatchableGroupCard = (props) => (
  <Link to={props.link} style={{ textDecoration: 'none', color: '#000' }}>
    <Card>
      <Title>{props.name}</Title>
      {props.course && <StyledSubtitle>{props.course}</StyledSubtitle>}
      {props.date && <StyledSubtitle>{props.date}</StyledSubtitle>}
      {props.location && <StyledSubtitle>{props.location}</StyledSubtitle>}
      {props.description && <Content detail>{props.description}</Content>}
    </Card>
  </Link>
);


export const renderCourseGroups = (listings, index, key) => {
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

        date={listing.time ? new Date(Math.round(listing.time / coeff) * coeff).toLocaleString('en-CA') : null}
        location={listing.location}
        description={listing.description}/>
    </StyledListGroupItem>
  );
};



function MatchableCourseGroup(props) {
  const { subject } = props.match.params;
  return (<MatchableGroupList header={`Here's the current ${subject} study groups`} getGroups={() => getGroups(subject, props.userId)} renderer={renderCourseGroups}/>);
}

const mapStateToProps = (state) => ({
  userId: state.session.user.id
});

export default connect(
  mapStateToProps,
  null
)(MatchableCourseGroup);
