import React from 'react'
import { Container } from 'reactstrap';
import { fetchNews } from '../../ducks/uw';
import ListPage from '../../components/ListPage';
import { NewsCard, StyledListGroupItem } from './components';

const renderNews = (news, index, key) => {
  const updatedAt = `Updated ${news[index].date}`;
  return (
    <StyledListGroupItem key={key}>
      <NewsCard
        link={news[index].link}
        title={news[index].title}
        subtitle={updatedAt}
      />
    </StyledListGroupItem>
  );
}

function NewsTab(props) {
  const NewsComponent = ListPage(fetchNews, null, renderNews);
  return (
    <Container>
      <br/>
      <h4>Here is what's happening around the campus</h4>
      <hr/>
      <NewsComponent />
    </Container>
  );
}

export default NewsTab;
