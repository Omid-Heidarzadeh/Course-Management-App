import React, { useState, useEffect } from 'react';
import AuthorStore from './../stores/authorStore';
import Pagination from './common/Pagination';
import CourseList from './CoursesList';
import CourseStore from '../stores/courseStore';
import { loadCourses, deleteCourse } from '../actions/courseActions';
import { loadAuthors } from '../actions/authorActions';
import { toast } from 'react-toastify';
import { Link, useSearchParams } from 'react-router-dom';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [authors, setAuthors] = useState([]);

  // Number of courses per page
  const coursesPerPage = 5;

  // pagination props
  const numOfPages = Math.ceil(courses.length / coursesPerPage);
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(parseInt(query.get('page'), 10) || 1);

  // course list props
  const fromIndex = (page - 1) * coursesPerPage;
  const toIndex = fromIndex + coursesPerPage;

  useEffect(() => {
    AuthorStore.addChangeListener(onAuthorChange);
    if (!AuthorStore.hasLoaded()) loadAuthors();
    else setAuthors(AuthorStore.getAuthors());

    CourseStore.addChangeListener(onCourseChange);
    if (!CourseStore.hasLoaded()) loadCourses();
    else setCourses(CourseStore.getCourses());

    return () => {
      CourseStore.removeChangeListener(onCourseChange);
      AuthorStore.removeChangeListener(onAuthorChange);
    };
  }, []);

  function onCourseChange() {
    setCourses(CourseStore.getCourses());
  }

  function onAuthorChange() {
    setAuthors(AuthorStore.getAuthors());
  }

  function handleDelete(id) {
    if (courses.length % coursesPerPage === 1) {
      goToPage(page - 1);
    }
    deleteCourse(id);
    toast.success('Course successfully deleted.');
  }

  function goToPage(value) {
    setPage(value);
    setQuery({ page: value });
  }

  return (
    <div className="container">
      <h2>Courses</h2>
      <Link to="/course" className="btn btn-primary">
        Add Course
      </Link>
      <CourseList
        courses={courses.slice(fromIndex, toIndex)}
        authors={authors}
        onDelete={handleDelete}
        itemsPerPage={coursesPerPage}
      />
      <Pagination
        ariaLabel="Courses list pages"
        page={page}
        numOfPages={numOfPages}
        goToPage={goToPage}
      />
    </div>
  );
}

export default CoursesPage;
