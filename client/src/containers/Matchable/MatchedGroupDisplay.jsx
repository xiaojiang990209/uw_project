import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { getGroup } from '../../ducks/matchable';
import { MatchableGroupDisplayCard } from './component';

function MatchedGroup(props) {
  const { groupId } = props.match.params;
  const [group, setGroup] = useState(null);
  useEffect(() => {
    getGroup(groupId).then(setGroup)
      .catch(err => console.log(err));
  }, []);

  return (
    group &&
    <Container>
      <br/>
      <h4>Here's the <strong>{group.groupName}</strong> study group</h4>
      <hr/>
      <MatchableGroupDisplayCard
        name={group.groupName}
        course={`${group.subject} ${group.courseId}`}
        size={group.groupSize}
        date={new Date(group.time).toLocaleString('en-CA')}
        location={group.location}
        description={group.description}
        users={group.users} />
    </Container>
  );
}

export default MatchedGroup;
