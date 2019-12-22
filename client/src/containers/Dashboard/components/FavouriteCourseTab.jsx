import React from 'react';
import { Button } from '../../../components/Button';
import BaseTab from '../hocs/BaseTab';
import { Link } from 'react-router-dom';
import { ListGroupItem } from 'reactstrap';

const renderFavouriteCourses = (favouriteCourses, index, key) => {
  const favouriteCourse = favouriteCourses[index];
  const [subject, catalog_number] = favouriteCourse.course.split(" ");
  return (
    <ListGroupItem key={key}>
      <Link to={`/course/${favouriteCourse.term.value}/${subject}/${catalog_number}`} style={{ textDecoration: 'none', color: '#fff' }}>
          <Button block size="lg">
            {favouriteCourse.course} - {favouriteCourse.term.label}
          </Button>
      </Link>
    </ListGroupItem>
  );
}

const storeFetcher = (state) => {
  const favouriteCourses = [];
  Object.keys(state.session.user.favouriteCourses).forEach(course => {
    state.session.user.favouriteCourses[course].forEach(term => {
      favouriteCourses.push({ course, term });
    });
  });
  return favouriteCourses;
};

export default BaseTab(null, storeFetcher, renderFavouriteCourses);
