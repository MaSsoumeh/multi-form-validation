import React from 'react';
import InputField from './InputField';
import MultiStepForm from './MultiStepForm';
import FormStep from './FormStep';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';

const visaRegEx = /^(\+\d{1,3}[- ]?)?\d{11}$/;
const validationSchema = yup.object({
  accidentLocation: yup.string().required('محل وقوع را مشخص کنید'),
  visitingLocation: yup.string().required('محل بازدید را مشخص کنید'),
});

const MainForm = () => {
  return (
    <div>
      <MultiStepForm
        initialValues={{
          accidentLocation: '',
          visitingLocation: '',
          mobileNumber: '',
          damagedName: '',
        }}
        onSubmit={(values) =>
          fetch(
            'https://insurance-3d4b9-default-rtdb.firebaseio.com/form.json',
            {
              method: 'POST',
              body: JSON.stringify(values),
              headers: {
                'content-type': 'application/json',
              },
            }
          )
        }
      >
        <FormStep
          stepName='مشخصات عمومی حادثه'
          validationSchema={validationSchema}
          onSubmit={() => console.log('step1')}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <InputField label='محل وقوع حادثه*' name='accidentLocation' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField label='محل بازدید*' name='visitingLocation' />
            </Grid>
          </Grid>
        </FormStep>
        <FormStep
          stepName='مشخصات زیان دیده'
          validationSchema={yup.object({
            mobileNumber: yup
              .string()
              .required(' تلفن خود را وارد کنید')
              .matches(visaRegEx, 'تلفن همراه نامعتبر است'),
            damagedName: yup.string().required(' نام مالک را وارد کنید'),
          })}
          onSubmit={() => console.log('step2')}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <InputField label='تلفن همراه*' name='mobileNumber' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField label='نام مالک / راننده*' name='damagedName' />
            </Grid>
          </Grid>
        </FormStep>
      </MultiStepForm>
    </div>
  );
};

export default MainForm;
