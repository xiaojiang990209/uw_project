import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 80%;
  margin: ${({theme}) => theme.unit.large}px auto;
  @media (max-width: 1024px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
