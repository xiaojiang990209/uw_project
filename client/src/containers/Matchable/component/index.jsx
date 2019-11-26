import styled from 'styled-components';
import { Modal, ModalBody, FormGroup } from 'reactstrap';

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
  max-width: 60%;
  min-width: 610px;
`

export const StyledModalBody = styled(ModalBody)`
  padding: ${({theme}) => 2 * theme.unit.small}px;
`
