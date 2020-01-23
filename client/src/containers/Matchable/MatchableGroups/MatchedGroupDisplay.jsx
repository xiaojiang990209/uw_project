import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { getGroup } from '../../../ducks/matchable';
import MatchableGroupDisplayCard from '../MatchableSingleGroup';

function MatchedGroup(props) {
  const { groupId } = props.match.params;
  const [group, setGroup] = useState(null);

  useEffect(() => {
    getGroup(groupId).then(setGroup)
      .catch(err => console.log(err));
  }, []);

  const coeff = 1000 * 60 * 5;

  return (
    group &&
    <Container>
      <br/>
      <h4><strong>{group.groupName}</strong></h4>
      <hr/>
      <MatchableGroupDisplayCard
        groupId={groupId}
        isGroupFull={group.users.length === group.groupSize}
        posts={group.posts}
        name={group.groupName}
        course={group.courseId ? `${group.subject} ${group.courseId}` : `${group.subject}`}
        size={group.groupSize}
        date={group.time ? new Date(Math.round(group.time / coeff) * coeff).toLocaleString('en-CA') : null}
        location={group.location}
        description={group.description}
        users={group.users}
      />
    </Container>
  );
}

export default MatchedGroup;
