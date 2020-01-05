import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCar, faHome, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'reactstrap';
import Button from '../../../components/Button';

const LANDING_CONTENT = {
  course: {
    icon: faUniversity,
    title: 'Course Information',
    content: 'See course offerings, availabilities and professor ratings in one shot!'
  },
  housing: {
    icon: faHome,
    title: 'Housing',
    content: 'Have you figured out where you will be living next term?'
  },
  carpool: {
    icon: faCar,
    title: 'Carpool',
    content: 'Find available carpools in Waterloo, Toronto and many other cities!'
  },
  matchable: {
    icon: faBook,
    title: 'Study Buddies',
    content: 'Create course-based study groups and tackle difficult problems together!'
  },
}

const StyledIconWrapper = styled.div`
  color: #007bff;
  width: 100%;
  text-align: center;
  margin: ${({theme}) => theme.unit.medium}px auto;
`;

const StyledLandingTitle = styled.p`
  font-size: 21px;
  text-align: center;
  -webkit-font-smoothing: auto;
`;

const StyledLandingContent = styled.p`
  font-size: 15px;
  text-align: center;
  -webkit-font-smoothing: auto;
`;

const LandingCard = (props) => {
  const { icon, title, content, onClick } = props;
  return (
    <div onClick={onClick}>
      <StyledIconWrapper><FontAwesomeIcon icon={icon} size="5x"/></StyledIconWrapper>
      <StyledLandingTitle>{title}</StyledLandingTitle>
      <StyledLandingContent>{content}</StyledLandingContent>
    </div>
  );
}

const createLandingCard = (contentProps) => (props) => (
  <LandingCard onClick={props.onClick} {...contentProps} />
);

export const CourseLandingCard = createLandingCard(LANDING_CONTENT.course);
export const HousingLandingCard = createLandingCard(LANDING_CONTENT.housing);
export const CarpoolLandingCard = createLandingCard(LANDING_CONTENT.carpool);
export const MatchableLandingCard = createLandingCard(LANDING_CONTENT.matchable);

export const LandingButton = styled(Button)`
  margin: ${({theme}) => theme.unit.medium}px;
  min-width: 200px;
  &:hover {
    background: #e9e9e9;
  }
`;

const FooterWrapper = styled.div`
  position: relative;
  width: 100vw;
  left: calc(-50vw + 50%);
  margin-top: ${({theme}) => 3*theme.unit.medium}px;
  margin-bottom: ${({theme}) => theme.unit.medium}px;
  font-weight: bold;
`;

const HeaderWrapper = styled(FooterWrapper)`
  margin: ${({theme}) => theme.unit.medium}px auto;
  color: #fff;
  background: #343a40;
  padding: 3rem 0;
  @media (min-width: 768px) {
    padding: 10rem 0;
  }
`;

export const StyledTitle = styled.p`
  font-size: 2.2rem;
  margin-bottom: 3rem;
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const StyledFooterText = styled.p`
  margin: ${({theme}) => 2*theme.unit.small}px;
  color: #575757;
  text-decoration: none;
`

export const StyledLogo = styled(StyledFooterText)`
  font-family: 'Permanent Marker', cursive;
  font-size: 1.6rem;
  color: #000;
`;

export const StyledLink = styled.a`
  &:hover {
    text-decoration: none;
  }
`;

export const Content = (props) => (
  <Container>
    {props.children}
  </Container>
);

export const Header = (props) => (
  <HeaderWrapper>
    <Content {...props} />
  </HeaderWrapper>
);

export const Footer = (props) => (
  <FooterWrapper>
    <Content {...props} />
  </FooterWrapper>
);
