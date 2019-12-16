import React from 'react';
import { Button, Row, Col, Container } from 'reactstrap';
import { joinGroup } from '../../ducks/matchable';

function MatchedGroup(props) {
  const { group } = props;
  console.log(group);

  const onJoinGroup = () => joinGroup(group._id, '5da7caef11aed184842b6b03');

  return (
    <Container>
      <Row>
        <Col xs="9">
          <Row><Col><strong>Course:</strong> {group.courseID}</Col></Row>
          <Row><Col><strong>Members:</strong> {group.users.length}</Col></Row>
          <Row><Col><strong>From:</strong> {new Date(group.startDate).toLocaleString()}</Col></Row>
          <Row><Col><strong>To:</strong> {new Date(group.endDate).toLocaleString()}</Col></Row>
        </Col>
        <Col xs="3" style={{ display: 'flex', alignItems: 'center' }}>
          <Button color="success" onClick={onJoinGroup}>Join</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MatchedGroup;