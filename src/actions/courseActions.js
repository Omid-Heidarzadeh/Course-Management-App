import Dispatcher from '../appDispatcher.js';
import { actionTypes } from './actionTypes';
import * as courseApi from './../api/courseApi';

export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    Dispatcher.dispatch({
      type: course.id ? actionTypes.UPDATE_COURSE : actionTypes.CREATE_COURSE,
      course: savedCourse,
    });
  });
}

export function deleteCourse(courseId) {
  return courseApi.deleteCourse(courseId).then((deletedCourse) => {
    Dispatcher.dispatch({
      type: actionTypes.DELETE_COURSE,
      courseId,
    });
  });
}

export function loadCourses() {
  return courseApi
    .getCourses()
    .then((courses) => {
      Dispatcher.dispatch({ type: actionTypes.LOAD_COURSES, courses });
    })
    .catch((err) => console.log('LOAD_COURSES action failed :', err));
}
