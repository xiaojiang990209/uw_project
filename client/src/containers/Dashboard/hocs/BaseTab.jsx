import React, { useState, useEffect } from 'react';
import ReactList from 'react-list';

export default function BaseTab(dataFetcher, itemRenderer) {
  return (props) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = () => {
      dataFetcher().then(data => setData(data)).catch(err => setError(err));
    }

    useEffect(fetchData, []);

    let content;
    if (error || !data) {
      content = (<div>{error}</div>);
    } else {
      content = (
        <div style={{overflow: 'auto', maxHeight: 400}}>
          <ReactList
            itemRenderer={(index, key) => { return itemRenderer(data, index, key); }}
            length={data.length} />
        </div>
      );
    }

    return (<>{content}</>);
  }
}