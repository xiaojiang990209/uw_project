import styled from 'styled-components';
import { FormGroup, ListGroupItem, Modal, ModalBody } from 'reactstrap';
import { Subtitle } from '../../../components/Card';

export const StyledFormGroup = styled(FormGroup)`
  margin-bottom: ${({ theme }) => 1.5 * theme.unit.medium}px;
`;

export const FormWrapper = styled.div`
  width: 90%;
  margin: 0px auto;
  padding: ${({ theme }) => theme.unit.medium}px;
  font-size: 16px;
`;

export const StyledModal = styled(Modal)`
  max-width: 768px;
`;

export const StyledModalBody = styled(ModalBody)`
  padding: ${({ theme }) => 2 * theme.unit.small}px;
`;

export const StyledBookingTable = styled.div`
  overflow-x: scroll;
`;

export const StyledListGroupItem = styled(ListGroupItem)`
  border: none;
  background: transparent;
`;

export const StyledSubtitle = styled(Subtitle)`
  margin-top: ${({ theme }) => 1.5 * theme.unit.small}px;
`;
