import React, { Component } from 'react';
import './CourseDetail.css';

const InstructorComponent = (props) => 
  <p>Instructor: {props.instructor}, Score: <a href={props.instructorInfo.url}>{props.instructorInfo.score}</a></p>

class CourseDetail extends Component {

  constructor(props) {
    super(props);
    this.state = { instructorInfo: {} };
}

  componentDidMount() {
    const instructor = this.props.course.instructor;
    if (instructor != null) {
      fetch(`/api/rmp/${instructor}`, {
        accept: 'application/json'
      })
      .then(resp => resp.json())
      .then(data => this.setState({ instructorInfo: data }))
      .catch(err => console.log(err));
    }
  }


  render() {
    let instructorComponent;
    if (this.props.course.instructor != null) {
      instructorComponent = <InstructorComponent instructor={this.props.course.instructor} instructorInfo={this.state.instructorInfo} />
    }
    
    return (
      <div>
        <p>Course: {this.props.course.name}, {this.props.course.title}</p>
        <p>Location: {this.props.course.location}</p>
        {instructorComponent}
      </div>
    );
  }
}

export default CourseDetail;
