import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { green, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
const useStyles = makeStyles(() => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
  },
}));
const FormNavigation = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.buttons}>
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
