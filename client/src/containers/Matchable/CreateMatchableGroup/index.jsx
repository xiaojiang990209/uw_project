import React from 'react';
import {Container } from "reactstrap";
import './css/modal.css';
import { GroupCreationForm } from'./components'

const MatchableCreate = (props) => (
  <Container>
    <br/>
    <h4>Creating A Study Group</h4>
    <hr/>
    <GroupCreationForm {...props}/>
  </Container>
);

export default (MatchableCreate);
