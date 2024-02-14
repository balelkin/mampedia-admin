import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

export default function FormInput({ name, type, label, value, handleChange }) {
  return (
    <TextField
      autoComplete="given-name"
      name={name}
      required
      fullWidth
      type={type}
      label={label}
      value={value}
      onChange={handleChange}
      autoFocus
    />
  );
}

FormInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

FormInput.defaultProps = {
  name: '',
  type: '',
  label: '',
  value: '',
};
