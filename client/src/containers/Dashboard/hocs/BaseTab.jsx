import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactList from 'react-list';

export default function BaseTab(dataFetcher, storeFetcher, itemRenderer) {
  function Tab(props) {
    const [data, setData] = useState(props.data);
    const [error, setError] = useState(null);

    const fetchData = () => {
      if (dataFetcher) {
        dataFetcher().then(data => setData(data)).catch(err => setError(err));
      }
    }

    useEffect(fetchData, []);

    let content;
    if (error || !data) {
      content = (<div>{error}</div>);
    } else {
      content = (
        <div style={{overflow: 'auto', maxHeight: 400}}>
          <ReactList
            itemRenderer={(index, key) => itemRenderer(data, index, key)}
            length={data.length} />
        </div>
      );
    }

    return (<>{content}</>);
  }
  return connect(storeFetcher, null)(Tab);
}