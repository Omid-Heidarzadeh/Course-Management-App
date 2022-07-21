import React from 'react';
import Input from './Input';
import PropTypes from 'prop-types';

function TextInput(props) {
  return <Input type="text" {...props} />;
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

TextInput.defaultProps = {
  error: '',
  value: '',
};

export default TextInput;
