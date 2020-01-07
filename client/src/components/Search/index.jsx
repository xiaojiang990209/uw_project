import React from 'react';
import { Button } from 'reactstrap';
import { SearchCard, SearchInput } from './components';

function Search(props) {
  return (
    <SearchCard>
      <SearchInput placeholder={props.placeholder} onChange={props.onChange} />
      <Button color="success" onClick={props.onClick}>{props.confirmText}</Button>
    </SearchCard>
  );
}

export default Search;


