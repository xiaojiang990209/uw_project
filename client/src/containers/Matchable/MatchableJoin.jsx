import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Label, Input, Col } from 'reactstrap';
import Select from '../../components/Select';
import { getTerms } from '../../ducks/course';
import { fetchBookingDates } from '../../ducks/uw';
import { matchGroup } from '../../ducks/matchable';
import { FormWrapper, StyledFormGroup } from './component';
import MatchedGroupModal from './MatchableMatchedGroupModal';

function MatchableJoin(props) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [matchedGroups, setMatchedGroups] = useState(null);

  const [error, setError] = useState(null);

  const selectMapper = (e) => ({ value: e, label: e });

  const subjects = (props.subjects || []).map(selectMapper);

  const initializeSubjects = () => {
    if (!(props.subjects || []).length) {
      props.getTerms();
    }
  };
  useEffect(initializeSubjects, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const subject = selectedSubject.value;
    const courseID =selectedCourse;
    matchGroup(subject, courseID)
      .then(res => { 
        if (!res.data){
          return setError(true);
        }
        setMatchedGroups(res.data);
      })
      .catch(err => setError(err));
  };

  const redirectOnError = () => {
    props.history.push('/matchable/create', {
      selectedSubject,
      selectedCourse,
    });
  };

  const groupNotFoundErrorBlock = (
    <Button color="danger" onClick={redirectOnError} outline block>
        Oops didn't find you with any group! Would you like to start one instead?
    </Button>
  );

  const onJoinGroup = (groupId) => {
    props.history.push(`/matchable/groups/${groupId}`);
  };

  return (
    <FormWrapper>
      <br/>
      <h4>Looking for study buddies? Fill out the form below!</h4>
      <hr/>
      <Form onSubmit={onFormSubmit}>
        <StyledFormGroup row>
          <Label for="subject" md={2}>Subject</Label>
          <Col>
            <Select value={selectedSubject} onChange={setSelectedSubject} options={subjects} placeholder="Subject" required/>
          </Col>
        </StyledFormGroup>
        <StyledFormGroup row>
          <Label for="courseCode" md={2}>Course code(optional)</Label>
          <Col>
              <Input id="courseCode" placeholder="Course code" value={selectedCourse} maxLength={3} required onChange={e => setSelectedCourse(e.target.value)}/>
          </Col>
        </StyledFormGroup>
        <Button block type="submit" color="success">Find!</Button>
        { error && groupNotFoundErrorBlock }
          <MatchedGroupModal matchedGroups={matchedGroups} user={props.user.id}
            onCreateGroup={redirectOnError} onJoinGroup={onJoinGroup}/>
      </Form>
    </FormWrapper>
  );
}

const mapStateToProps = (state) => ({
  user: state.session.user,
  subjects: state.course.subjects
});

const mapDispatchToProps = ({
  getTerms
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchableJoin);

