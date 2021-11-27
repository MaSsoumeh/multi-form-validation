import React from 'react';
import Button from '@mui/material/Button';

const FormNavigation = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        marginTop: 50,
        justifyContent: 'space-between',
      }}
    >
      {props.hasPrevious && (
        <Button variant='text' type='button' onClick={props.onBackClick}>
          بازگشت به صفحه قبل
        </Button>
      )}
      <Button variant='contained' type='submit'>
        {props.isLastStep ? 'ذخیره' : 'تایید و ادامه'}
      </Button>
    </div>
  );
};

export default FormNavigation;
