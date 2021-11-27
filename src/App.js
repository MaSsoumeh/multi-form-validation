import { Formik } from 'formik';
import { TextField, Button } from '@mui/material';
import * as yup from 'yup';
import './App.css';

const validationSchema = yup.object({
  accidentLocation: yup.string().required('محل وقوع را مشخص کنید'),
  email: yup
    .string()
    .email('آدرس ایمیل نامعتبر است')
    .required('ایمیل را وارد کنید'),
});

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Formik
          initialValues={{
            accidentLocation: '',
            email: '',
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
          validationSchema={validationSchema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                style={{ textAlign: 'right' }}
                id='accidentLocation'
                label='محل وقوع حادثه*'
                name='accidentLocation'
                variant='standard'
                value={formik.values.accidentLocation}
                onChange={formik.handleChange}
                error={
                  formik.touched.accidentLocation &&
                  Boolean(formik.errors.accidentLocation)
                }
                helperText={
                  formik.touched.accidentLocation &&
                  formik.errors.accidentLocation
                }
              />
              <TextField
                fullWidth
                id='email'
                label='ایمیل*'
                name='email'
                variant='standard'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <Button
                style={{ marginTop: '20px' }}
                fullWidth
                type='submit'
                variant='contained'
              >
                تایید
              </Button>
            </form>
          )}
        </Formik>
      </header>
    </div>
  );
}

export default App;
