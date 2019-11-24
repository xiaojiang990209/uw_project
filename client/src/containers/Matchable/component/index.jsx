import styled from 'styled-components';
import { FormGroup } from 'reactstrap';

export const StyledFormGroup = styled(FormGroup)`
  margin-bottom: ${({theme}) => 3 * theme.unit.medium}px;
`;

export const FormWrapper = styled.div`
  width: 75%;
  margin: 0px auto;
  padding: ${({theme}) => theme.unit.medium}px;
  font-size: 16px;
`;