import { Formik } from 'formik';
import { Button } from '@mui/material';
import InputField from './components/InputField';
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
              <InputField label='محل وقوع حادثه*' name='accidentLocation' />
              <InputField label='ایمیل*' name='email' />
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
