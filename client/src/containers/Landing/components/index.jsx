import styled from 'styled-components';
import { Container, Row } from 'reactstrap';
import Button from '../../../components/Button';

export const LandingButton = styled(Button)`
  min-width: 200px;
  background: #d7ecff;
  border: none;
  margin-bottom: ${({theme}) => theme.unit.medium}px;
  &:hover, &:focus, &:active {
    background: #bde0ff !important;
    box-shadow: 0px 4px 4px rgba(0,0,0,0.2) !important;
    color: #000 !important;
  }
`;

export const StyledTitle = styled.p`
  font-size: 3rem;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const StyledFooterText = styled.p`
  margin: ${({theme}) => 2*theme.unit.small}px;
  color: #575757;
  text-decoration: none;
  text-align: center;
`

export const StyledLogo = styled(StyledFooterText)`
  font-family: 'Permanent Marker', cursive;
  font-size: 1.6rem;
  color: #000;
  text-align: center;
`;

export const LandingBackground = styled.div`
  position: absolute;
  z-index: -1;
  width: 100vw;
  left: calc(-50vw + 50%);
  top: 0px;
  padding-top: ${({theme}) => 2*theme.unit.large}px;
  padding-bottom: ${({theme}) => theme.unit.large}px;
  font-weight: bold;
  background: aliceblue;
  @media (max-width: 768px) {
    height: 880px;
  }
  @media (min-width: 768px) {
    height: 820px;
  }
  @media (min-width: 1000px) {
    height: 740px;
  }
  @media (min-width: 1200px) {
    height: 600px;
  }
`;

export const Subheading = styled.div`
  text-align: center;
  margin-top: 64px;
  font-weight: bold;
  font-size: 1.9rem;
`;

export const DescriptionContainer = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin: 24px 0px;
`

export const ContentRow = styled(Row)`
  margin: ${({theme}) => theme.unit.large}px 0px;
`;

export const AppImage = styled.img`
  width: 70vw;
  max-width: 500px;
  border-radius: 16px;
`;

export const Header = styled(Container)`
  margin-top: ${({theme}) => theme.unit.large}px;
`;

export const Content = styled(Container)`
  margin-top: ${({theme}) => theme.unit.large + theme.unit.medium}px;
`;

export const Footer = styled(Container)`
  margin: ${({theme}) => theme.unit.medium}px auto;
`;
