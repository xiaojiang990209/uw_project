import { Button as BasicButton } from 'reactstrap';
import styled from 'styled-components';

export default styled(BasicButton)`
  background-color: ${({theme}) => theme.color.secondary};
  border-color: ${({theme}) => theme.color.secondary};
  color: ${({theme}) => theme.color.primary};
  min-height: ${({theme}) => theme.unit.large}px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  &:hover, &:active {
    color: ${({theme}) => theme.color.primary};
    background-color: ${({theme}) => theme.color.secondary};
    border-color: ${({theme}) => theme.color.secondary};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
