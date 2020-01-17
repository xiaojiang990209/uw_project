import React from 'react'
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { getGroups } from '../../ducks/matchable';
import ListPage from '../../components/ListPage';
import { MatchableSubjectGroupCard,  } from './component/MatchableSingleGroup';
import { StyledListGroupItem } from './component';

const renderSubjectGroups = (listings, index, key) => {
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

function MatchableSubjectGroup(props) {
  const MatchableSubjectGroupComponent = ListPage(
    () => getGroups(null, props.userId), null, renderSubjectGroups);
  return (
    <Container>
      <br/>
      <h4>Here's the current study groups</h4>
      <hr/>
      <MatchableSubjectGroupComponent />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  userId: state.session.user.id
});

export default connect(
  mapStateToProps,
  null
)(MatchableSubjectGroup);
