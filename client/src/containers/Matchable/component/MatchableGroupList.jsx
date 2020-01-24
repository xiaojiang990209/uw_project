import ListPage from "../../../components/ListPage";
import { Container } from "reactstrap";
import React from "react";

function MatchableGroupList({getGroups, header, renderer}) {
  const MatchableSubjectGroupComponent = ListPage(
    getGroups, null, renderer);
  return (
    <Container>
      <br/>
      <h4>{header}</h4>
      <hr/>
      <MatchableSubjectGroupComponent />
    </Container>
  );
};

export default MatchableGroupList;
