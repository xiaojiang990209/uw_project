import React from 'react'
import { fetchNews } from '../../ducks/news';
import { ListGroupItem } from 'reactstrap';
import BaseTab from './BaseTab';

const renderNews = (news, index, key) => (
  <ListGroupItem key={key}>
    <a href={news[index].link}>{news[index].title}</a>
  </ListGroupItem>
)

export const NewsTab = BaseTab(fetchNews, renderNews);