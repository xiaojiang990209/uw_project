import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import {
  CourseLandingCard,
  CarpoolLandingCard,
  MatchableLandingCard,
  Header,
  Content,
  Footer,
  LandingButton,
  StyledTitle,
  StyledLogo,
  StyledFooterText,
  StyledLink
} from './components';
import { logoutUser } from '../../ducks/session';

function Landing(props) {
  const { history, isAuthenticated, logoutUser } = props;

  const registerAndLoginSection = (
    <Row>
      <Col sm={12} md={{ size: 3, offset: 3 }} className="text-center">
        <LandingButton onClick={() => history.push('/register')}>Register</LandingButton>
      </Col>
      <Col sm={12} md={{ size: 3 }} className="text-center">
        <LandingButton onClick={() => history.push('/login')}>Sign In</LandingButton>
      </Col>
    </Row>
  );
  const logoutSection = (
    <Row>
      <Col className="text-center">
        <LandingButton onClick={() => logoutUser(history)}>Sign Out</LandingButton>
      </Col>
    </Row>
  );

  return (
    <>
      <Header>
        <Row>
          <Col className="text-center">
            <StyledTitle>A one-stop shop for everything a UW student needs!</StyledTitle>
          </Col>
        </Row>
        {isAuthenticated ? logoutSection : registerAndLoginSection}
      </Header>
      <Content>
        <Row>
          <Col sm={12} md={4}>
            <CourseLandingCard />
          </Col>
          <Col sm={12} md={4}>
            <MatchableLandingCard />
          </Col>
          <Col sm={12} md={4}>
            <CarpoolLandingCard />
          </Col>
        </Row>
      </Content>
      <Footer>
        <Row>
          <Col className="text-center">
            <StyledLogo>UWAssisT</StyledLogo>
            <StyledFooterText>Produced by Roger Jiang & Winnie Wang by 🦙 </StyledFooterText>
            <StyledFooterText>
              <StyledLink href="https://github.com/xiaojiang990209/uw-project">Github</StyledLink>
            </StyledFooterText>
          </Col>
        </Row>
      </Footer>
  </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.session.isAuthenticated
});

const mapDispatchToProps = ({
  logoutUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
