import React from 'react'
import { fetchNews } from '../../../ducks/uw';
import { ListGroupItem } from 'reactstrap';
import BaseTab from '../hocs/BaseTab';

const renderNews = (news, index, key) => (
  <ListGroupItem key={key}>
    <a href={news[index].link}>{news[index].title}</a>
  </ListGroupItem>
)

export default BaseTab(fetchNews, renderNews);