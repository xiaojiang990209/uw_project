import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100%;
  margin-top: ${({ theme }) => 3 * theme.unit.medium}px;
`;

export const TextWrapper = styled.div`
  font-size: 14px;
`;

export const BoldTitle = styled.p`
  font-weight: bold;
  margin: ${({ theme }) => 0.5 * theme.unit.small}px 0px;
`;
