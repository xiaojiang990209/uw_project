import React from 'react';
import { Container } from 'reactstrap';
import FBInfiniteScroll from '../../components/FBInfiniteScroll';
import { FBPostCard, StyledListGroupItem } from './components';

const _convertTimestamp = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-CA', { timeZone: 'UTC' });
}

const _renderFBPost = (data, idx) => (
  <StyledListGroupItem key={idx}>
    <FBPostCard
      {...data}
      published_at={_convertTimestamp(data.created_at)}/>
  </StyledListGroupItem>
)


function FBPost(props) {
  const { city, type } = props.match.params;
  const title = `Here's some ${type.toLowerCase()} posts in ${city.charAt(0).toUpperCase() + city.slice(1)}`

  return (
    <Container>
      <br/>
      <h4>{title}</h4>
      <hr/>
      <FBInfiniteScroll city={city} type={type} itemRenderer={_renderFBPost} />
    </Container>
  );
}

export default FBPost;
