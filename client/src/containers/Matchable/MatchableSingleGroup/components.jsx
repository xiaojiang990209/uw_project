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

export const BoxContainer = styled.div`
    padding: 15px;
    background: #f7fbff;
    border-radius: 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    margin-top: 10px;
`;


export const PostContainer = styled(BoxContainer)`
  margin-top: 20px;
    padding: 15px;
`;

export const EnterPostContainer =  styled(BoxContainer)`
  padding: 15px;
  height: 80px;
  &:hover {
    cursor: text;
  }
`;

export const MemberScroll = styled(BoxContainer)`
    overflow: scroll;
    max-height: 200px;
`;

export const PostTextArea = styled.textarea`
   resize: none;
    outline: none;
    border: none !important;
    background: #f7fbff;
    border-radius: 10px;
    width: 500px;
    height: 100px
    margin: 15px 15px 10px 15px;
    width: 100%;
    margin: 0;
`;

