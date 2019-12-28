import styled from 'styled-components';
import { Input } from 'reactstrap';
import { StyledWrapper } from '../../Card/components';

export const SearchCard = styled(StyledWrapper)`
  display: flex;
  padding: 0px;
  position: sticky;
  top: 65px;
`;

export const SearchInput = styled(Input)`
  margin: ${({theme}) => theme.unit.small}px;
  border: 0px;
  background-color: transparent;
  &:focus {
    background-color: transparent;
    box-shadow: 0 0 0 0;
  }
`;
