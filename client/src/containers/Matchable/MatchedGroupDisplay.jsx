import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Form, FormGroup, Input, ListGroup, ListGroupItem } from 'reactstrap';
import ReactList from 'react-list';
import { getGroup } from '../../ducks/matchable';
import { FormWrapper, StyledUsername } from './component';

function MatchedGroup(props) {
  const { groupId } = props.match.params;
  const [group, setGroup] = useState(null);
  useEffect(() => {
    getGroup(groupId).then(setGroup)
      .catch(err => console.log(err));
  }, []);
  return (
    group &&
    <FormWrapper>
      <Form>
        <FormGroup>
          <h5>Course</h5>
          <Input value={group.courseID} readOnly/>
        </FormGroup>
        <FormGroup>
          <h5>From</h5>
          <Input value={new Date(group.startDate).toLocaleString()} readOnly/>
        </FormGroup>
        <FormGroup>
          <h5>To</h5>
          <Input value={new Date(group.endDate).toLocaleString()} readOnly/>
        </FormGroup>
        <FormGroup>
          <h5>Member count</h5>
          <Input value={`${group.users.length} / ${group.groupSize}`} readOnly />
        </FormGroup>
        <ListGroup>
          <h5>Members</h5>
          <ReactList length={group.users.length} itemRenderer={(idx, key) => (
            <ListGroupItem key={key} style={{ border: 'none' }}>
              <Avatar name={group.users[idx].name} size="50" round/>
              <StyledUsername>{group.users[idx].name}</StyledUsername>
            </ListGroupItem>
          )} />
        </ListGroup>
      </Form>
    </FormWrapper>
  );
}

export default MatchedGroup;
