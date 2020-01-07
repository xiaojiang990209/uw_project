import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactList from 'react-list';
import LoadingGate from "../../LoadingGate";

/**
 * A Hoc that is designed to display a list of items, specified by props.data
 * @param {*} itemRenderer 
 */
function ListPage(itemRenderer) {
  return (props) => {
    const { error, data } = props;
    return (error || !data) ?
      (<div>{error}</div>) :
      (<div style={{ overflow: 'auto' }}>
        <ReactList itemRenderer={(index, key) => itemRenderer(data, index, key)} length={data.length}/>
      </div>)
  };
}

export default function BaseListPage(apiFetcher, storeFetcher, itemRenderer) {
  const ListComponent = ListPage(itemRenderer);
  if (storeFetcher) {
    const mapStateToProps = (state) => ({ data: storeFetcher(state) });
    return connect(mapStateToProps, null)(ListComponent);
  }
  return () => {
    const [data, setData] = useState(null);
    const [err, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      apiFetcher().then((data) => {
        setData(data);
        setLoading(false);
    }).catch(setError); }, []);

    return isLoading ? <LoadingGate /> : <ListComponent data={data} error={err} />
  }
}
