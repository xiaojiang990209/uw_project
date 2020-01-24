import React from 'react'
import { connect } from 'react-redux';
import { getGroups } from '../../../ducks/matchable';
import MatchableGroupList from "../component/MatchableGroupList";
import { StyledListGroupItem } from "../component";
import { Link } from "react-router-dom";
import { Card, Subtitle, Title } from "../../../components/Card";

export const MatchableSubjectGroupCard = (props) => (
  <Link to={props.link} style={{ textDecoration: 'none', color: '#000' }}>
    <Card>
      <Title>{props.subject}</Title>
      <Subtitle>{`${props.count} ${props.count > 1 ? 'current groups' : 'current group'}`}</Subtitle>
    </Card>
  </Link>
);

const MatchableListItem = (listings, index, key) => {
  const listing = listings[index];
  return (
    <StyledListGroupItem key={key}>
      <MatchableSubjectGroupCard
        link={`/matchable/groups/subject/${listing.subject.toUpperCase()}`}
        subject={listing.subject}
        count={listing.count}>
      </MatchableSubjectGroupCard>
    </StyledListGroupItem>
  );
};


const MatchableSubjectGroup = (props) =>
  (
    <MatchableGroupList
    header="Here's the current study groups"
    getGroups={() => getGroups(null, props.userId)}
    renderer={MatchableListItem}
    />
    );

const mapStateToProps = (state) => ({
  userId: state.session.user.id
});

export default connect(
  mapStateToProps,
  null
)(MatchableSubjectGroup);
