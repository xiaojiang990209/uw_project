import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactList from 'react-list';


/**
 * A Hoc that is designed to display a list of items, specified by props.data
 * @param {*} itemRenderer 
 */
function Tab(itemRenderer) {
  return (props) => {
    const { error, data } = props;
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
  };
}

export default function BaseTab(apiFetcher, storeFetcher, itemRenderer) {
  const TabComponent = Tab(itemRenderer);
  if (storeFetcher) {
    const mapStateToProps = (state) => ({ data: storeFetcher(state) });
    return connect(mapStateToProps, null)(TabComponent);
  }
  return () => {
    const [data, setData] = useState(null);
    const [err, setError] = useState(null);
    useEffect(() => { apiFetcher().then(setData).catch(setError); }, []);
    return <TabComponent data={data} error={err} />
  };
};