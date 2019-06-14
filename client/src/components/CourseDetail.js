import React, { Component } from 'react';
import { getProfRating, getCourseDescription } from '../actions/courseActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import M from 'materialize-css';

class CourseDetail extends Component {
    constructor() {
        super();
        this.state = {
            showDetail: false,
        }
    }

    componentDidMount() {
        const elem = document.getElementById(this.props.modalName);
        M.Modal.init(elem);
    }

    onClick = e => {
        let showDetail = !this.state.showDetail;
        const instance = M.Modal.getInstance(document.getElementById(this.props.modalName));
        if (showDetail) {
            instance.open();
        } else {
            instance.close();
        }
        this.setState({showDetail});
    }

    profRatingRow = (instructor) => {
        let ratingRow = <td>{instructor}</td>
        let rating = this.props.ratingsMap[instructor];
        if (rating !== undefined && rating !== null) {
            ratingRow = (
                <td><a href={rating.url} className="white-text">{instructor} ({rating.score})</a></td>
            );
        } 
        return ratingRow;
    }

    courseInfoSection() {
        let infoSection;
        let info = this.props.courseDescriptions[this.props.course.name];
        console.log(`info = ${info}`);
        if (info !== undefined && info !== null) {
            infoSection = (
                <div className="col s12">
                <p><b>Description</b>: {info.description}</p>
                <p><b>Prerequisites</b>: {info.prerequisites}</p>
                <p><b>Antirequisites</b>: {info.antirequisites}</p>
                </div>
            );
        }
        return infoSection;
    }

    createCourse = (course) => {
        let sections = []
        if (course.sections) {
            // Prefetch distinct instructor data
            let distinctInstructors = [...new Set(course.sections.filter(x => x.instructor).map(x => x.instructor))];
            if (this.state.showDetail) {
                // Fetch instructor information
                distinctInstructors.forEach(x => {
                    if (!(x in this.props.ratingsMap)) {
                        this.props.getProfRating(x);
                    }
                });
                // Fetch course descriptions
                if (!(course.name in this.props.courseDescriptions)) {
                    //this.props.getCourseDescription(course.name);
                }
            }
            
            sections = course.sections.map((value,index) => {
                const timeSlot = value.start === null ? <td>TBA</td> : <td>{value.start}-{value.end}, {value.days}</td>
                const ratingRow = this.profRatingRow(value.instructor);
                return (
                    <tr key={index}>
                        <td>{value.section}</td>
                        <td>{value.class_number}</td>
                        <td>{value.total} / {value.capacity}</td>
                        {timeSlot}
                        <td>{value.location}</td>
                        {ratingRow}
                    </tr>
                )
            });
        }
        let table = (
            <table>
                <thead>
                    <tr>
                        <th>Section</th>
                        <th>Class</th>
                        <th>Enrolled</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Instructor</th>
                    </tr>
                </thead>
                <tbody>
                    {sections}
                </tbody>
            </table>
        )
        return (
        <div>
            <div className="card blue" onClick={this.onClick} style={{height: '150px'}}>
                <div className="card-content white-text">
                    <span className="card-title">{course.name}: {course.title}</span><br/>
                </div>
            </div>
            <div id={this.props.modalName} className="modal card blue">
                <div className="modal-content">
                    <div className="card-content white-text">
                        <span className="card-title">{course.name}: {course.title}</span><br/>
                        {this.courseInfoSection()}
                        {table}
                    </div>
                </div>
            </div>
        </div>
   )}

    render() {
        return (
            this.createCourse(this.props.course)
        )
    }
}

CourseDetail.propTypes = {
    getProfRating: PropTypes.func.isRequired,
    getCourseDescription: PropTypes.func.isRequired,
    ratingsMap: PropTypes.object.isRequired,
    courseDescriptions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    ratingsMap: state.course.ratingsMap,
    courseDescriptions: state.course.descriptions
});

export default connect(
    mapStateToProps,
    { getProfRating, getCourseDescription }
)(CourseDetail);