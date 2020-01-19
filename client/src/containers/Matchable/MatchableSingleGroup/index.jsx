import React from 'react';
import Avatar from 'react-avatar';
import ReactList from 'react-list';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Title, Subtitle, Content } from '../../../components/Card';
import { JoinButton, StyledUsername, MemberScroll, BoxContainer, PostTextArea, EnterPostContainer, PostContainer} from './components';
import { StyledSubtitle, StyledListGroupItem } from '../component';
import {updateGroup, updatePosts} from "../../../ducks/matchable";
import {CreateButton} from "../CreateMatchableGroup/components";

const coeff = 1000 * 60 * 5;

export const MatchableSubjectGroupCard = (props) => (
  <Link to={props.link} style={{ textDecoration: 'none', color: '#000' }}>
    <Card>
      <Title>{props.subject}</Title>
      <Subtitle>{`${props.count} ${props.count > 1 ? 'current groups' : 'current group'}`}</Subtitle>
    </Card>
  </Link>
);

export const MatchableGroupCard = (props) => (
  <Link to={props.link} style={{ textDecoration: 'none', color: '#000' }}>
    <Card>
      <Title>{props.name}</Title>
      {props.course && <StyledSubtitle>{props.course}</StyledSubtitle>}
      {props.date && <StyledSubtitle>{props.date}</StyledSubtitle>}
      {props.location && <StyledSubtitle>{props.location}</StyledSubtitle>}
      {props.description && <Content detail>{props.description}</Content>}
    </Card>
  </Link>
);



const MatchableGroupDisplayCard = (props) => {
  const [postExpand, setExpand] = React.useState(false);
  const [post, setPost] = React.useState('');
  const {userId,userName, users, isGroupFull, name, posts, groupId} = props;
  const hasJoined = users.some((user) => user.id === userId);

  const groupUpdate = () => {
    if(hasJoined){
      const currentUsers = users.map((user) => user.id).filter(id => id !== userId);
      console.log(currentUsers);
      updateGroup(groupId, currentUsers).then(() =>  window.history.back());

    }else{
      const currentUsers = users.map((user) => user.id);
      updateGroup(groupId, [...currentUsers, userId]).then(() =>  window.location.reload());
    }
  };

  const postUpdate = () => {
    //TODO: check the empty string
    console.log(post);
    if(post.trim()){
      updatePosts(groupId, post).then(() =>  window.location.reload());
      setPost('');
      setExpand(false);
    }
  };

  const buttonAppear = !hasJoined&&!isGroupFull ? 'Join Group' : hasJoined ? 'Leave Group' : 0;

  return (
  <Card>
    {buttonAppear && <CreateButton style={{'float': 'right'}} onClick={groupUpdate}>{buttonAppear}</CreateButton>}
      <Title>{name}</Title>
      {props.course && <StyledSubtitle>{props.course}</StyledSubtitle>}
    {props.date && <StyledSubtitle>{props.date}</StyledSubtitle>}
      {props.location && <StyledSubtitle>{props.location}</StyledSubtitle>}

      <StyledSubtitle>{`Member count: ${props.users.length} / ${props.size}`}</StyledSubtitle>
      {props.description && <Content detail>{props.description}</Content>}
      <hr/>
      <Subtitle>Members</Subtitle>
    {!!users.length && ( <MemberScroll>
      <Subtitle></Subtitle>
      <ReactList length={props.users.length} itemRenderer={(idx, key) => (
        <StyledListGroupItem key={key} style={{ border: 'none' }}>
          <Avatar name={props.users[idx].name} size="50" round/>
          <StyledUsername>{props.users[idx].name}</StyledUsername>
        </StyledListGroupItem>
      )} />
    </MemberScroll>)}
    <hr/>
    <Subtitle>Posts</Subtitle>
    {hasJoined && (!postExpand ?
      (<EnterPostContainer onClick={() => setExpand(true)}>
        <Avatar style={{'float': 'left'}} name={userName} size="50" round/>
        <div style={{'margin-top': '15px', 'margin-left': '70px', color: 'rgba(0, 0, 0, 0.5)'}}>Write a post...</div>
      </EnterPostContainer>) :
      (<BoxContainer style={{height: '235px'}}>
        <div style={{height: '60px'}}>
        <Avatar style={{'float': 'left'}} name={userName} size="50" round/>
        <StyledUsername style={{'margin-top': '10px'}}>{userName}</StyledUsername>
        <JoinButton onClick={()=> setExpand(false)}>Close</JoinButton>
        </div>
        <PostTextArea value={post} onChange={(e)=>setPost(e.target.value)} placeholder="Anything to say to your group members...."></PostTextArea>
        <JoinButton style={{'float': 'left'}} onClick={postUpdate}>Submit</JoinButton>
      </BoxContainer>)
    )}
    {(!posts.length&&!hasJoined) &&
    <div style={{'margin-top': '10px', 'text-align': 'center', 'font-size': '18px'}}>
      Join and add a post to this group
    </div>
    }

    <ReactList length={posts.length} itemRenderer={(idx, key) => (
      <PostContainer key={key}>
        <Avatar style={{'float': 'left'}} name={posts[idx].ownerName} size="50" round/>
        <StyledUsername>{posts[idx].ownerName}</StyledUsername>
        <div style={{color: 'rgba(0, 0, 0, 0.5)', 'margin-left': '65px', 'font-size': '15px'}} >{new Date(Math.round(posts[idx].timePosted / coeff) * coeff).toLocaleString('en-CA')}</div>
        <div style={{color: '#000', 'margin-top': '15px', 'margin-left': '10px'}}>{posts[idx].postData}</div>
      </PostContainer>
    )} />

  </Card>
)};

const mapStateToProps = (state) => ({
  userId: state.session.user.id,
  userName:  state.session.user.name,
});


export default connect(
  mapStateToProps,
  null,
)(MatchableGroupDisplayCard);
