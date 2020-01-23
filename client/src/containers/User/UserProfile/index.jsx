import React from "react";
import { Container } from 'reactstrap';
import { Card } from "../../../components/Card";
import { connect } from 'react-redux';
import { Input } from 'reactstrap';

const UserProfile = ({userName, userEmail}) => {
  return (
    <Container>
      <br/>
      <h4>{`${userName}'s Profile`}</h4>
      <Card>
        <div>
        Name:
        </div>
        <div>
        Email:
      </div>
        <div>
          Joined:
        </div>
      </Card>
      <h4>Add More Information About You</h4>
      <Card>
        <div>
          Program:
        </div>
        <div>
          Year:
        </div>
      </Card>
    </Container>
  )
};

const mapStateToProps = (state) => ({
  userName: state.session.user.name,
  userEmail: state.session.user.email,
});


export default connect(
  mapStateToProps
)(UserProfile);