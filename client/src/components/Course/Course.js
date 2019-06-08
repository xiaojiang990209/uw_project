import React, { Component } from 'react';
import App from '../App/App';
import CourseDetail from '../CourseDetail/CourseDetail';
import './Course.css';

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = { courses: [] };
  }

  componentDidMount() {
    fetch('/api/courses?term=1195&subject=cs', {
      accept: 'application/json'
    })
    .then(resp => resp.json())
    .then(data => this.setState({ courses: data }))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <App>
        <div id="courseContainer">
          <ul>
          {this.state.courses.map((course, i) =>
            <CourseDetail key={i} course={course} />
            // <li key={i}>{JSON.stringify(course)}</li>
          )}
          </ul>
        </div>
      </App>
   );
  }
}

export default Course;
