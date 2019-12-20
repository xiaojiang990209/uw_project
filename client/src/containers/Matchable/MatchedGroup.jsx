import React from 'react';
import { Button, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { joinGroup } from '../../ducks/matchable';

function MatchedGroup(props) {
  const { group, user } = props;

  const onJoinGroup = () => joinGroup(group._id, user);

  const locale = 'en-CA';
  const date = new Date(group.startDate).toLocaleDateString(locale, { dateStyle: 'short' })
  const from  = new Date(group.startDate).toLocaleTimeString(locale, { timeStyle: 'short' });
  const to  = new Date(group.endDate).toLocaleTimeString(locale, { timeStyle: 'short' });

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>{group.courseID}</CardTitle>
          <CardSubtitle>{date}, {from} - {to}</CardSubtitle>
        </CardBody>
      </Card>
      <Button color="success" onClick={onJoinGroup}>Join</Button>
    </>
  );
}

export default MatchedGroup;
