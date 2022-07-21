import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const { type, label, id, name, value, error, onChange, onBlur } = props;

  const inputProps = {
    id,
    name,
    value,
    onChange,
    onBlur,
  };

  function getClass() {
    return error && error.length ? 'form-control is-invalid' : 'form-control';
  }

  function renderInput(type) {
    switch (type) {
      case 'select': {
        return (
          <select className={getClass()} {...inputProps}>
            {props.children}
          </select>
        );
      }
      default: {
        return <input type="text" className={getClass()} {...inputProps} />;
      }
    }
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="field">
        {renderInput(type)}
        {error && <small className="form-text text-danger">{error}</small>}
      </div>
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  error: '',
};

export default Input;
