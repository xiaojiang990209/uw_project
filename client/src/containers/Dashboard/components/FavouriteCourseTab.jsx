import React from 'react';
import Button from '../../../components/Button';
import BaseTab from '../hocs/BaseTab';
import { Link } from 'react-router-dom';
import { ListGroupItem } from 'reactstrap';

const renderFavouriteCourses = (favouriteCourses, index, key) => {
  const favouriteCourse = favouriteCourses[index];
  const [subject, catalog_number] = favouriteCourse.split(" ");
  return (
    <ListGroupItem key={key}>
      <Link to={`/course/${subject}/${catalog_number}`} style={{ textDecoration: 'none', color: '#fff' }}>
        <Button block size="lg">{favouriteCourse}</Button>
      </Link>
    </ListGroupItem>
  );
}

const storeFetcher = (state) => state.session.user.favouriteCourses;

export default BaseTab(null, storeFetcher, renderFavouriteCourses);
