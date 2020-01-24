import React from "react";
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import {BasicProfile, MoreInfo} from "./components";
import moment from "moment";

const UserProfile = ({userName, userEmail, joinedDate}) => {
  return (
    <Container>
      <br/>
      <BasicProfile name={userName} email={userEmail} joinedDate={moment(joinedDate).format('MMMM Do, YYYY')}/>
      {/*<MoreInfo/>*/}
    </Container>
  )
};

const mapStateToProps = (state) => ({
  userName: state.session.user.name,
  userEmail: state.session.user.email,
  joinedDate: state.session.user.joined,
});


export default connect(
  mapStateToProps
)(UserProfile);