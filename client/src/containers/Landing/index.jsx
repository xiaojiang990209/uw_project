import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {
  LandingButton,
  StyledTitle,
  StyledLogo,
  StyledFooterText,
  ContentRow,
  Subheading,
  DescriptionContainer,
  LandingBackground,
  AppImage,
  Header,
  Content,
  Footer
} from './components';
import { logoutUser } from '../../ducks/session';
import { ReactSVG } from 'react-svg';

function Landing(props) {
  const { history, isAuthenticated, logoutUser } = props;

  const registerAndLoginSection = (
    <Row>
      <Col className="text-center">
        <LandingButton onClick={() => history.push('/register')}>Register</LandingButton>
      </Col>
      <Col className="text-center">
        <LandingButton onClick={() => history.push('/login')}>Sign In</LandingButton>
      </Col>
    </Row>
  );

  const logoutSection = (
    <Row>
      <Col className="text-center">
        <LandingButton onClick={() => logoutUser(history)} block>Sign Out</LandingButton>
      </Col>
    </Row>
  );

  return (
    <>
      <LandingBackground>
      </LandingBackground>
      <Header>
        <Row>
          <Col>
            <StyledTitle>A one-stop shop for everything a UW student needs!</StyledTitle>
            <div>Explore course schedule & professor rating, find study partners and book study rooms across campus,
              discover carpol and sublet information, all in one shot!</div>
            <br/><br/>
            {isAuthenticated ? logoutSection : registerAndLoginSection}
          </Col>
          <Col>
            <ReactSVG className="text-center" src="/images/geese.svg"/>
          </Col>
        </Row>
      </Header>
      <Content>
        <ContentRow>
          <Col className="text-center">
            <AppImage src="/images/course.png" alt="course rating"/>
          </Col>
          <Col>
            <Subheading>Explore your courses & professor ratings!</Subheading>
            <DescriptionContainer>Use course description, schedule and professor ratings to determine your next semester</DescriptionContainer>
          </Col>
        </ContentRow>
        <hr/>
        <ContentRow>
          <Col>
            <Subheading>Find study partners and book study rooms!</Subheading>
            <DescriptionContainer>Join study groups with the people you haven't met with and tackle problems together</DescriptionContainer>
          </Col>
          <Col className="text-center">
            <AppImage src="/images/match.png" alt="matchable"/>
          </Col>
        </ContentRow>
        <hr/>
        <ContentRow>
          <Col className="text-center">
            <AppImage src="/images/sublet.png" alt="sublet"/>
          </Col>
          <Col>
            <Subheading>Finding sublets has never been so easy!</Subheading>
            <DescriptionContainer>Discover sublet and carpool opportunities from postings aggregated from multiple Facebook groups</DescriptionContainer>
          </Col>
        </ContentRow>
      </Content>
      <Footer>
        <Row>
          <Col>
            <StyledLogo>UWAssisT</StyledLogo>
            <StyledFooterText>Produced by Roger Jiang & Winnie Wang by 🦙 </StyledFooterText>
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
