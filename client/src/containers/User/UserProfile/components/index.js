import BasicProfile from './BasicProfile';
import MoreInfo from './MoreInfo';
import styled from 'styled-components';
import { Card } from '../../../../components/Card';

export const InfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const BasicInfoContainer = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CardContainer = styled(Card)`
  box-shadow: 0 2px 4px 0 rgba(14, 30, 37, 0.12);
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
`;

export { BasicProfile, MoreInfo };
