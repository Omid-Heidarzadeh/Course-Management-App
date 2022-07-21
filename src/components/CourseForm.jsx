import React from 'react';
import PropTypes from 'prop-types';
import { STATUS } from './utils/enums';
import SelectInput from './common/SelectInput';
import TextInput from './common/TextInput';
import FormErrors from './common/FormErrors';

function CourseForm(props) {
  const {
    authors,
    status,
    errorMessages,
    touched,
    onChange,
    onSubmit,
    onBlur,
  } = props;
  const { title, authorId, category } = props.course;

  function populateAuthorList(author) {
    return (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    );
  }

  const getInputErrorFor = (key) => {
    return touched[key] && (errorMessages[key] || '');
  };

  const inputHandlers = { onChange, onBlur };

  return (
    <div className="container p-5 col-md-6">
      {status === STATUS.SUBMITTED ? (
        <FormErrors errors={errorMessages} />
      ) : null}
      <form onSubmit={onSubmit}>
        <h1>Manage Course</h1>
        <TextInput
          label="Title"
          id="title"
          name="title"
          value={title}
          error={getInputErrorFor('title')}
          {...inputHandlers}
        />
        <SelectInput
          label="Author"
          id="author"
          name="authorId"
          value={authorId || ''}
          error={getInputErrorFor('authorId')}
          {...inputHandlers}
        >
          <option value="" />
          {authors.length && authors.map(populateAuthorList)}
        </SelectInput>
        <TextInput
          label="Category"
          id="category"
          name="category"
          value={category}
          error={getInputErrorFor('category')}
          {...inputHandlers}
        />
        <button type="submit" className="btn btn-primary">
          Save Course
        </button>
      </form>
    </div>
  );
}

CourseForm.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    authorId: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,

  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,

  status: PropTypes.oneOf([...Object.values(STATUS)]).isRequired,

  errorMessages: PropTypes.shape({
    title: PropTypes.string,
    authorId: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,

  touched: PropTypes.object.isRequired,

  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CourseForm;
