import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthorStore from '../stores/authorStore';
import { loadAuthors, saveAuthor } from '../actions/authorActions';
import AuthorForm from './AuthorForm';
import { STATUS } from './utils/enums';
import { toast } from 'react-toastify';

const validationPatterns = {
  name: /^[a-zA-Z. -]{3,}$/,
};

function ManageAuthorPage() {
  const { authorId } = useParams();
  const navigate = useNavigate();

  const [author, setAuthor] = useState({ id: null, name: '' });
  const [status, setStatus] = useState(STATUS.IDLE);
  const [touched, setTouched] = useState({});

  // Derived states
  const errors = getErrors(author);
  const isValid = Object.keys(errors).length === 0;
  const errorMessages = {
    name:
      errors.name === 'empty'
        ? 'Author name is required'
        : errors.name === 'invalid'
        ? 'Name must be at least 3 characters long and valid characters are: alphabetic, space, dot and dash(-)'
        : '',
  };

  useEffect(() => {
    async function getAuthor() {
      if (!AuthorStore.hasLoaded()) await loadAuthors();
      if (authorId) {
        const _author = AuthorStore.getAuthorById(+authorId);
        if (!_author) navigate('/PageNotFound');
        else setAuthor(_author);
      }
    }

    getAuthor();
  }, [navigate, authorId]);

  function getErrors(author) {
    const result = {};
    Object.entries(validationPatterns).forEach(([key, regExp]) => {
      if (!regExp.test(author[key])) result[key] = 'invalid';
      if (!author[key]) result[key] = 'empty';
    });
    return result;
  }

  function handleBlur(event) {
    setTouched({ ...touched, [event.target.name]: true });
  }

  function handleChange(event) {
    setAuthor({ ...author, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid) {
      setStatus(STATUS.SUBMITTED);
      return;
    }

    setStatus(STATUS.SUBMITTING);

    const authors = AuthorStore.getAuthors();
    const sameNamedAuthor = authors.find(
      (_author) => _author.name.toLowerCase() === author.name.toLowerCase()
    );

    if (sameNamedAuthor) {
      if (!authorId || authorId !== sameNamedAuthor.id) {
        // If trying to add a new author or If trying to update an author name to an existing one
        setStatus(STATUS.SUBMITTED);
        toast.error('Thers is already an author with the same name.');
        return;
      }
    }

    saveAuthor(author)
      .then(() => {
        setStatus(STATUS.COMPLETED);
        navigate('/authors');
        toast.success(
          `Author is successfully ${author.id ? 'updated' : 'saved'}.`
        );
      })
      .catch((err) => {
        console.error('Submission failed', err);
        setStatus(STATUS.SUBMITTED);
        toast.error('Something went wrong. Try again.');
      });
  }

  return (
    <AuthorForm
      author={author}
      status={status}
      touched={touched}
      errorMessages={errorMessages}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  );
}

export default ManageAuthorPage;
