import React, { useEffect, useState } from 'react';
import { default as Scroll } from 'react-infinite-scroller';
import { getPosts } from '../../ducks/fbGroupPost';

function BaseFBInfiniteScroll(props) {
  const [timestamp, setTimestamp] = useState(null);
  const [data, setData] = useState([]);
  const [moreItems, setMoreItems] = useState(true);

  const { city, type, itemRenderer } = props;

  const populatePosts = (timestamp) => {
    const query = timestamp ?
      ({ city, type, timestamp }) :
      ({ city, type });

    getPosts(query)
      .then((res) => {
        const prevData = data;
        setData(prevData.concat(res.data));
        setMoreItems(res.nextTimestamp !== timestamp);
        setTimestamp(res.nextTimestamp);
      })
      .catch(console.log);
  }

  useEffect(populatePosts, []);

  const items = data.map((d, idx) => itemRenderer(d, idx));

  return (
    <Scroll
      pageStart={0}
      loadMore={() => populatePosts(timestamp)}
      hasMore={moreItems}>
      {items}
    </Scroll>
  );
}

export default BaseFBInfiniteScroll;

