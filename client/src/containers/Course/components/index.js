import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100%;
`;

export const TextWrapper = styled.div`
  font-size: 14px;
`;

export const BoldTitle = styled.p`
  font-weight: bold;
  margin: ${({ theme }) => 0.5 * theme.unit.small}px 0px;
`;

export const MarginWrapper = styled.div`
  margin: ${({ theme }) => 4 * theme.unit.small}px auto;
`;
