import styled from 'styled-components';
import { Button, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import GroupCreationForm from '../MatchableCreationForm';
import DatePickerContainer from './DatePickerCustomInput';
import Select from '../../../../components/Select';
import 'react-datepicker/dist/react-datepicker.css';

export const StyledBookingTable = styled.div`
  overflow-x: scroll;
`;

export const InputContainer = styled.div`
  margin-bottom: ${({ theme }) => 1.5 * theme.unit.medium}px;
  width: ${({ width }) => (width ? width : 'auto')};
  margin-right: ${({ mr }) => (mr ? mr : 0)};
`;

export const MultipleInputContainer = styled(InputContainer)`
  margin-bottom: 0;
  justify-content: flex-start;
  display: flex;
`;

export const FormWrapper = styled.div`
  width: 90%;
  margin: 0px auto;
  padding: ${({ theme }) => theme.unit.medium}px;
  font-size: 16px;
`;

export const BookingFormHeader = styled(ModalHeader)`
  display: block;
`;

export const StyledModal = styled(Modal)`
  max-width: 768px;
`;

export const StyledModalBody = styled(ModalBody)`
  padding: ${({ theme }) => 2 * theme.unit.small}px;
`;

export const CreateInput = styled(Input)`
  border-radius: 10px;
  height: ${({ height }) => (height ? height : '50')}px !important;
  outline: none;
`;

export const CreateSelect = styled(Select)`
  border-radius: 10px;
  height: 50px;
  outline: none;
`;

export const CreateButton = styled(Button)`
  border-radius: 10px;
  height: 45px;
  background: ${({ theme }) => theme.color.text}
  border: none;
  &:hover, &:active, &:focus, &focus-within {
    background: ${({ theme }) => theme.color.text} !important;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.3) !important;
  }
`;

export const SubjectContainer = styled.div`
  width: 40%;
  margin-right: 60px;
`;

export { GroupCreationForm, DatePickerContainer };
