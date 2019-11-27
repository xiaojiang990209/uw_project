import { Button as BasicButton } from 'reactstrap';
import styled from 'styled-components';

const Button = styled(BasicButton)`
  background-color: ${({theme}) => theme.color.primary}
  border-color: ${({theme}) => theme.color.primary}
`;

export default Button;