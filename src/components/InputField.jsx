import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      fullWidth
      label={label}
      {...field}
      {...props}
      error={meta.touched}
      helperText={meta.error}
      variant='standard'
    />
  );
};

export default InputField;
