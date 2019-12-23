import React from 'react';
import { Button, CardHeader, CardBody, CardText } from 'reactstrap';
import { joinGroup } from '../../ducks/matchable';
import { StyledCard } from './component';

function MatchedGroupAdapter(props) {
  const { group, user } = props;

  const onJoinGroup = () => {
    joinGroup(group._id, user)
      .then((res) => props.onJoinGroup(group._id))
      .catch(console.log);
  }

  const locale = 'en-CA';
  const date = new Date(group.startDate).toLocaleDateString(locale, { dateStyle: 'short' })
  const from  = new Date(group.startDate).toLocaleTimeString(locale, { timeStyle: 'short' });
  const to  = new Date(group.endDate).toLocaleTimeString(locale, { timeStyle: 'short' });

  return (
    <StyledCard>
      <CardHeader tag="h5">
        {group.courseID} @ {from} - {to}
      </CardHeader>
      <CardBody>
        <CardText>
          Max members: {group.groupSize}<br/>
          Current members: {group.users.length}
        </CardText>
        <Button color="secondary" onClick={onJoinGroup} block>
          {group.users.includes(user) ? "Leave" : "Join"}
        </Button>
      </CardBody>
    </StyledCard>
  );
}

export default MatchedGroupAdapter;
