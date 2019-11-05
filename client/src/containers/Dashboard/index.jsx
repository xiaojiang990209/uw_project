import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../ducks/session';
import Weather from '../../components/Weather';
import TabContainer from '../../components/Tab/TabContainer';
import styled from 'styled-components';
import { NewsTab } from './Tabs';

const Wrapper = styled.div`
  width: 75%;
  margin: 10px auto;
`;

function Dashboard(props) {
  return (
    <Wrapper>
      <Weather />
      <TabContainer>
        <NewsTab title="What's around Campus"/>
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
