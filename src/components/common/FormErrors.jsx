import React from 'react';
import PropTypes from 'prop-types';

function hasMessage(errors) {
  return Object.values(errors).filter((value) => value.length).length > 0;
}

function FormErrors({ errors }) {
  if (!hasMessage(errors)) return null;

  return (
    <div className="text-danger">
      <p>Fix following errors:</p>
      <ul>
        {Object.values(errors).map((value, i) => {
          if (!value) return null;
          return <li key={i}>{value}</li>;
        })}
      </ul>
    </div>
  );
}

FormErrors.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string),
};

export default FormErrors;
