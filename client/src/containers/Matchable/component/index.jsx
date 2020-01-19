import styled from 'styled-components';
import { ListGroupItem } from 'reactstrap';
import { Subtitle } from '../../../components/Card';


export const StyledListGroupItem = styled(ListGroupItem)`
  border: none;
  background: transparent;
`;

export const StyledSubtitle = styled(Subtitle)`
  margin-top: ${({ theme }) => 1.5 * theme.unit.small}px;
`;
