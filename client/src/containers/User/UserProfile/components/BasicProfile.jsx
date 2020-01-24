import React from "react";
import Avatar from "react-avatar";
import { BasicInfoContainer,CardContainer as Card} from '.';

const BasicProfile = ({name, email, joinedDate}) => {
  return (
    <>
      <h4>{`${name}'s Profile`}</h4>
        <Card>
          <Avatar style={{'box-shadow': '0 0 0 6px #b9d4d6', 'margin': '10px 30px 10px 10px'}}color="cadetblue" name={name} size="150" round/>
          <BasicInfoContainer>
          <div>{`Name: ${name}`}</div>
          <div>{`Email: ${email}`}</div>
          <div>{`Joined: ${joinedDate}`}</div>
          </BasicInfoContainer>
        </Card>
    </>
  )
};


export default BasicProfile;