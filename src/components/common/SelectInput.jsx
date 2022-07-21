import React from 'react';
import Input from './Input';
import PropTypes from 'prop-types';

function SelectInput(props) {
  return (
    <Input type="select" {...props}>
      {props.children}
    </Input>
  );
}

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

SelectInput.defaultProps = {
  error: '',
};

export default SelectInput;
