import React from 'react';
import { Container } from 'reactstrap';
import ListPage from '../../components/ListPage';
import { StyledListGroupItem, FavouriteCourseCard } from './components';

const renderFavouriteCourses = (favouriteCourses, index, key) => {
  const favouriteCourse = favouriteCourses[index];
  const [subject, catalog_number] = favouriteCourse.split(" ");
  return (
    <StyledListGroupItem key={key}>
      <FavouriteCourseCard
        title={favouriteCourse}
        link={`/course/${subject}/${catalog_number}`}
      />
    </StyledListGroupItem>
  );
}

const storeFetcher = (state) => state.session.user.favouriteCourses;

function FavouriteCourse(props) {
  const FavouriteCourseComponent = ListPage(null, storeFetcher, renderFavouriteCourses);
  return (
    <Container>
      <br/>
      <h4>View your saved courses</h4>
      <hr/>
      <FavouriteCourseComponent />
    </Container>
  );
}

export default FavouriteCourse;
