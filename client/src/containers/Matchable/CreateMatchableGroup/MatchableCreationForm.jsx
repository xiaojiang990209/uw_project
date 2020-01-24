import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Form } from "reactstrap";
import DatePicker from "react-datepicker";
import { showErrorNotif } from "../../../utils/sendNotification";
import "react-datepicker/dist/react-datepicker.css";

import { Card } from '../../../components/Card';
import { InputContainer, CreateInput, CreateSelect, DatePickerContainer, SubjectContainer, MultipleInputContainer, CreateButton} from "./components";
import { getTerms } from "../../../ducks/course"
import { createGroup } from "../../../ducks/matchable";
import BuildingBookingForm from "./BuildingBookingForm";

const MatchableCreationForm = (props) => {
  const initialState = {
    groupName: '',
    description: '',
    couseId: '',
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'setGroupName':
        return {...state, groupName: action.payload};
      case 'setDescription':
        return {...state, description: action.payload};
      case 'setSubject':
        return {...state, subject: action.payload};
      case 'setCourseId':
        return {...state, couseId: action.payload};
      case 'setTime':
        return {...state, time: action.payload};
      case 'setGroupSize':
        return {...state, groupSize: action.payload};
      default:
        throw new Error();
    }
  }

  const [groupData, dispatch] = React.useReducer(reducer, initialState);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const selectMapper = (e) => ({ value: e, label: e });
  const groupSizes = [...Array(20).keys()].slice(2).map(selectMapper);
  const subjects = (props.subjects || []).map(selectMapper);

  const initializeSubjects = () => {
    if (!props.subjects.length) {
      props.getTerms();
    }
  };

  useEffect(initializeSubjects, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const mapValue = (data) => data.value;
    const value = Object.assign({}, groupData);
    value.subject = mapValue(groupData.subject);
    value.groupSize = mapValue(groupData.groupSize);

    createGroup(value)
      .then(data => props.history.push(`/matchable/groups`))
      .catch(err => console.log(err));
  };

  const onCreateRoomClicked = () => {
    if (!groupData.time) {
      return showErrorNotif("Please select a time before booking a room");
    }
    setShowBookingModal(!showBookingModal);
  }

  const DatePickerCustom = ({ value, onClick }) => (
    <DatePickerContainer onClick={onClick}>
      {value}
    </DatePickerContainer>
  );

  return (
    <Card>
      <Form onSubmit={onFormSubmit}>
        <InputContainer>
          <label>Group Name*</label>
            <CreateInput
              value={groupData.groupName}
              onChange={(e) => dispatch({ type: 'setGroupName', payload: e.target.value })}
              placeholder="Create a group name..."
              required
            />
        </InputContainer>
        <InputContainer>
          <label>Description</label>
            <CreateInput
              type="textarea"
              height='100'
              value={groupData.description}
              onChange={(e) => dispatch({ type: 'setDescription', payload: e.target.value })}
              placeholder="Add some detail to the group"
            />
        </InputContainer>
        <MultipleInputContainer>
          <SubjectContainer>
            <label>Subject*</label>
            <CreateSelect
              value={groupData.subject}
              onChange={(e) => dispatch({ type: 'setSubject', payload: e })}
              options={subjects}
              placeholder="Search for the subject"
              required
            />
          </SubjectContainer>
          <InputContainer width="25%" mr="20px">
            <label>Course ID</label>
            <CreateInput
              height={'40'}
              placeholder="e.g. 135"
              value={groupData.courseId}
              maxLength={3}
              onChange={(e) => dispatch({ type: 'setCourseId', payload: e.target.value })}
            />
          </InputContainer>
          <InputContainer width="25%">
            <label>Max Group Size*</label>
            <CreateSelect
              value={groupData.size}
              onChange={(e) => dispatch({ type: 'setGroupSize', payload: e})}
              options={groupSizes}
              placeholder="Maximum size"
              required
            />
          </InputContainer>
        </MultipleInputContainer>

        <MultipleInputContainer>
          <InputContainer width="25%" mr="100px">
            <label>Date of the Study*</label>
            <br/>
              <DatePicker
                minDate={new Date()}
                maxDate={new Date().setDate(new Date().getDate() + 6)}
                placeholderText="Select a Date"
                selected={groupData.time}
                onChange={(date) => dispatch({ type: 'setTime', payload: date })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="yyyy/MM/dd, h:mm aa"
                customInput={<DatePickerCustom />}
              />
          </InputContainer>
          <InputContainer>
            <label>Enter Study Date to Book Room</label>
            <br/>
            <CreateButton
              onClick={onCreateRoomClicked}>
              Book room on UW website!
            </CreateButton>
          </InputContainer>
        </MultipleInputContainer>

        <CreateButton type="submit">Create!</CreateButton>

        {showBookingModal &&
          <BuildingBookingForm
            isOpen={showBookingModal}
            date={groupData.time}
            onClose={() => setShowBookingModal(false)}
          />}

      </Form>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  subjects: state.course.subjects
});

const mapDispatchToProps = ({
  getTerms
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchableCreationForm);
