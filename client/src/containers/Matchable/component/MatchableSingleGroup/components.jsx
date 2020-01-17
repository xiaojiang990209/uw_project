import styled from "styled-components";
import { Button } from 'reactstrap';

export const JoinButton = styled(Button)`
  float: right;
`;

export const StyledUsername = styled.div`
  display: inline-block;
  font-size: 1.2rem;
  vertical-align: middle;
  margin-left: ${({theme}) => theme.unit.medium}px;
`;

export const MemberScroll = styled.div`
    overflow: scroll;
    max-height: 200px;
    border-radius: 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    margin-top: 10px;
`;