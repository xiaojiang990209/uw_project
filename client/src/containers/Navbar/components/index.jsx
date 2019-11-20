import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #373a47;
  z-index: 1000;
  position: fixed;
  left: 0px;
  top: 0px;
  height: ${({theme}) => 3 * theme.unit.medium + theme.unit.small}px;
  width: 100%;
`;