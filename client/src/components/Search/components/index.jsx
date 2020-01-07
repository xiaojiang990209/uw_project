import styled from 'styled-components';
import { Input } from 'reactstrap';
import { Card } from '../../Card';

export const SearchCard = styled(Card)`
  display: flex;
  padding: 0px;
  position: sticky;
  background: #e0e0e0;
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
