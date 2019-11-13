import React from 'react'
import { fetchImportantDates } from '../../../ducks/uw';
import { ListGroupItem } from 'reactstrap';
import BaseTab from '../hocs/BaseTab';

const renderImportantDate = (importantDates, index, key) => (
  <ListGroupItem key={key}>
    <a href={news[index].link}>{news[index].title}</a>
  </ListGroupItem>
)

export const NewsTab = BaseTab(fetchImportantDates, renderImportantDate);