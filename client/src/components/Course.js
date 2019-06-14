import React, { Component } from 'react';
import { getCourseSchedule } from '../actions/courseActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CourseDetail from './CourseDetail';
import M from 'materialize-css';

class Course extends Component {
    constructor() {
        super();
        this.state =  {
            subject: "",
            term: "",
            showCourseComponent: false,
            courses: []
        };
    }

    componentDidMount() {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        this.props.getCourseSchedule(this.state.term, this.state.subject)
            .then(res => this.setState({courses: res.data}))
            .catch(err => console.log(err));
        this.setState({showCourseComponent: true});
    }

    generateCourseDetails = (courses) => {
        return courses
            .map((value, index) => (
                <div key={index} className="col s6">
                    <CourseDetail modalName={`detail-modal-${index}`} course={value} />
                </div>
            ))
    }

    render() {
        let courseDetailSection;
        if (this.state.showCourseComponent && this.state.courses) {
            courseDetailSection = this.generateCourseDetails(this.state.courses);
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <select id="subject" onChange={this.onChange}>
                                    <option value="" disabled selected>Choose your subject</option>
                                    <option value="CS">CS</option>
                                    <option value="MATH">MATH</option>
                                    <option value="AFM">AFM</option>
                                </select>
                            </div>
                            <div className="input-field col s12">
                                <select id="term" onChange={this.onChange}>
                                    <option value="" disabled selected>Choose your term</option>
                                    <option value="1195">1195</option>
                                    <option value="1191">1191</option>
                                </select>
                            </div>
                            <div className="col s12" style={{paddingLeft: '11.25px'}}>
                                <button
                                    style={{
                                        width: '150px',
                                        borderRadius:'3px',
                                        letterSpacing: '1.5px',
                                        marginTop: '1rem'
                                    }}
                                    type='submit'
                                    className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                                    Get Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    {courseDetailSection}
                </div>
            </div>
        )
    }
}

Course.propTypes = {
    getCourseSchedule: PropTypes.func.isRequired,
};

const mapStateToProps = state => {return {}};

export default connect(
    mapStateToProps,
    { getCourseSchedule }
)(Course);
