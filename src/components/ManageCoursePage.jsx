import React, { useEffect, useState } from 'react';
import { createSlug } from '../api/courseApi';
import * as courseActions from '../actions/courseActions';
import CourseStore from '../stores/courseStore';
import { loadAuthors } from '../actions/authorActions';
import AuthorStore from './../stores/authorStore';
import { useParams, useNavigate } from 'react-router-dom';
import CourseForm from './CourseForm';
import { toast } from 'react-toastify';
import { STATUS } from './utils/enums';

const validationPatterns = {
  title: /^[\w\s:@$!?#().-]+$/,
  authorId: /^\d+$/,
  category: /^[\w\s:@$!?#().-]+$/,
};

const emptyCourse = {
  id: null,
  slug: '',
  title: '',
  authorId: null,
  category: '',
};

function ManageCourse() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Component States
  const [course, setCourse] = useState(emptyCourse);
  const [authors, setAuthors] = useState([]);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(STATUS.IDLE);

  // Derived States
  const errors = getErrors(course);
  const isValid = Object.keys(errors).length === 0;
  const errorMessages = {
    title:
      errors.title === 'empty'
        ? 'Title can not be empty'
        : errors.title === 'invalid'
        ? 'Valid characters for title are: alphabet characters, numbers, space and (:@$!?#.-)'
        : '',
    authorId:
      errors.authorId === 'empty'
        ? 'Author can not be empty'
        : errors.authorId === 'invalid'
        ? 'Author value is invalid'
        : '',
    category:
      errors.category === 'empty'
        ? 'Category can not be empty'
        : errors.category === 'invalid'
        ? 'Valid characters for category are: alphabet characters, numbers, space and (:@$!?#.-)'
        : '',
  };

  useEffect(() => {
    async function getCourse() {
      if (!CourseStore.hasLoaded()) await courseActions.loadCourses();
      if (slug) {
        const receivedCourse = CourseStore.getCourseBySlug(slug);
        if (!receivedCourse) navigate('/PageNotFound');
        else setCourse(receivedCourse);
      }
    }

    async function getAuthors() {
      if (!AuthorStore.hasLoaded) await loadAuthors();
      setAuthors(AuthorStore.getAuthors());
    }

    getCourse();
    getAuthors();
  }, [navigate, slug]);

  function getErrors(course) {
    const result = {};
    Object.entries(validationPatterns).forEach(([key, pattern]) => {
      if (!pattern.test(course[key])) result[key] = 'invalid';
      if (!course[key]) result[key] = 'empty';
    });
    return result;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newCourse = { ...course, [name]: value };

    setCourse({ ...newCourse, authorId: +newCourse.authorId });
  };

  const handleBlur = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValid) {
      setStatus(STATUS.SUBMITTED);
      return;
    }

    const newCourse = { ...course, slug: createSlug(course.title) };
    const courses = CourseStore.getCourses();
    const courseWithSameTitle = courses.find(
      (_course) => _course.title.toLowerCase() === course.title.toLowerCase()
    );

    // If trying to submit a new course with the same title
    if (courseWithSameTitle && !slug) {
      setStatus(STATUS.SUBMITTED);
      toast.error('There is already a course with the same name.');
      return;
    }

    setStatus(STATUS.SUBMITTING);
    courseActions
      .saveCourse(newCourse)
      .then(() => {
        setStatus(STATUS.COMPLETED);
        navigate('/courses');
        toast.success(`Course sucessfully ${course.id ? 'updated' : 'saved'}.`);
      })
      .catch((err) => {
        console.error('Form submittion failed: ', err);
        setStatus(STATUS.SUBMITTED);
        toast.error('Saving course failed. Try again.');
      });
  }

  return (
    <>
      <CourseForm
        course={course}
        authors={authors}
        status={status}
        touched={touched}
        errorMessages={errorMessages}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onBlur={handleBlur}
      />
    </>
  );
}

export default ManageCourse;
