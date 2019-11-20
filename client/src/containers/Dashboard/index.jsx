import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../ducks/session';
import Weather from '../../components/Weather';
import TabContainer from '../../components/Tab/TabContainer';
import styled from 'styled-components';
import NewsTab from './components/NewsTab';
import InfoSessionTab from './components/InfoSessionTab';

const Wrapper = styled.div`
  width: 75%;
  margin: ${({theme}) => theme.unit.large}px auto;
`;

function Dashboard(props) {
  return (
    <Wrapper>
      <Weather />
      <TabContainer>
        <NewsTab title="What's around Campus"/>
        <InfoSessionTab title="Upcoming Info Session"/>
      </TabContainer>
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
