import { Button as BasicButton } from 'reactstrap';
import styled from 'styled-components';

export const Button = styled(BasicButton)`
  background-color: ${({theme}) => theme.color.primary}
  border-color: ${({theme}) => theme.color.primary}
`;

export const CourseTitleButton = styled(Button)`
  height: ${({theme}) => theme.unit.large}px;
`

export default Button;
