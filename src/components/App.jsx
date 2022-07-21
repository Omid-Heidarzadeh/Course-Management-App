import React from 'react';
import AboutPage from './AboutPage';
import HomePage from './HomePage';
import Header from './common/Header';
import CoursesPage from './CoursesPage';
import ManageCoursePage from './ManageCoursePage';
import AuthorsPage from './AuthorsPage';
import ManageAuthorPage from './ManageAuthorPage';
import PageNotFound from './PageNotFound';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container-fluid">
      <ToastContainer autoClose="3000" />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:slug" element={<ManageCoursePage />} />
        <Route path="/course" element={<ManageCoursePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/author/:authorId" element={<ManageAuthorPage />} />
        <Route path="/author" element={<ManageAuthorPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/about-page"
          element={<Navigate to="/about" replace={true} />}
        />
        <Route path="/PageNotFound" element={<PageNotFound />} />
        <Route
          path="*"
          element={<Navigate to="/PageNotFound" replace={true} />}
        />
      </Routes>
    </div>
  );
}

export default App;
