import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ReactList from 'react-list';
import { fetchNews } from '../../ducks/news';
import { ListGroupItem } from 'reactstrap';

function News(props) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchNewsAndSaveState = () => {
    fetchNews()
      .then(data => setData(data))
      .catch(err => setError(err));
  }

  const renderItem = (index, key) => {
    return (
      <ListGroupItem key={key}>
        <a href={data[index].link}>{data[index].title}</a>
      </ListGroupItem>
    )
  }

  useEffect(fetchNewsAndSaveState, []);

  let content;
  if (error || !data) {
    content = (<div>{error}</div>);
  } else {
    content = (
      <div style={{overflow: 'auto', maxHeight: 400}}>
        <ReactList
          itemRenderer={(index, key) => { return renderItem(index, key); }}
          length={data.length}
          type='variable' />
      </div>
    );
  }

  return (
    <>
      {content}
    </>
  );
}

export default connect(
  null,
  { fetchNews }
)(News);