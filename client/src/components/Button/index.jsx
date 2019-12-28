import { Button as BasicButton } from 'reactstrap';
import styled from 'styled-components';

export const Button = styled(BasicButton)`
  background-color: ${({theme}) => theme.color.secondary};
  border-color: ${({theme}) => theme.color.secondary};
  color: ${({theme}) => theme.color.primary};
  min-height: ${({theme}) => theme.unit.large}px;
  &:hover, &:active {
    color: ${({theme}) => theme.color.primary};
    background-color: ${({theme}) => theme.color.secondary};
    border-color: ${({theme}) => theme.color.secondary};
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const CourseTitleButton = styled(Button)`
  margin-top: ${({theme}) => 2*theme.unit.small}px;
`;
