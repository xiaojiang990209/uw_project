import styled from 'styled-components';
import { Button, Card, Modal, ModalBody, FormGroup } from 'reactstrap';

export const StyledFormGroup = styled(FormGroup)`
  margin-bottom: ${({theme}) => 1.5 * theme.unit.medium}px;
`;

export const FormWrapper = styled.div`
  width: 75%;
  margin: 0px auto;
  padding: ${({theme}) => theme.unit.medium}px;
  font-size: 16px;
`;

export const StyledModal = styled(Modal)`
  max-width: 768px;
`

export const StyledModalBody = styled(ModalBody)`
  padding: ${({theme}) => 2 * theme.unit.small}px;
`

export const StyledBookingTable = styled.div`
  overflow-x: scroll;
`;

export const StyledButton = styled(Button)`
  margin-top: ${({theme}) => theme.unit.medium}px;
`;

export const StyledCard = styled(Card)`
  margin: ${({theme}) => 2 * theme.unit.small}px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 3px 6px rgba(0,0,0,0.23);
`;

export const StyledGroupResultWrapper = styled.div`
  max-height: 70vh;
  overflow: auto;
`;

export const StyledUsername = styled.div`
  display: inline-block;
  font-size: 1.2rem;
  vertical-align: middle;
  margin-left: ${({theme}) => theme.unit.medium}px;
`;
