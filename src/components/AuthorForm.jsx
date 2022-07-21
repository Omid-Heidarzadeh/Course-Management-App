import React from 'react';
import FormErrors from './common/FormErrors';
import { STATUS } from './utils/enums';
import TextInput from './common/TextInput';
import PropTypes from 'prop-types';

function AuthorForm(props) {
  const { author, status, touched, errorMessages, onBlur, onChange, onSubmit } =
    props;

  return (
    <div className="container col-m-6 p-5">
      {status === STATUS.SUBMITTED ? (
        <FormErrors errors={errorMessages} />
      ) : null}
      <form onSubmit={onSubmit}>
        <h1>Manage Author</h1>
        <TextInput
          label="Name"
          id="name"
          name="name"
          value={author.name}
          error={touched.name && errorMessages?.name}
          onChange={onChange}
          onBlur={onBlur}
        />
        <button type="submit" className="btn btn-primary">
          Save Author
        </button>
      </form>
    </div>
  );
}

AuthorForm.propTypes = {
  author: PropTypes.shape({ name: PropTypes.string }).isRequired,
  status: PropTypes.oneOf([...Object.values(STATUS)]).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  errorMessages: PropTypes.objectOf(PropTypes.string).isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AuthorForm;
