import InputField from './components/InputField';
import MultiStepForm, { FormStep } from './components/MultiStepForm';
import * as yup from 'yup';
import './App.css';

const visaRegEx = /^(\+\d{1,3}[- ]?)?\d{11}$/;
const validationSchema = yup.object({
  accidentLocation: yup.string().required('محل وقوع را مشخص کنید'),
  visitingLocation: yup.string().required('محل بازدید را مشخص کنید'),
});

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
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
            <InputField label='محل وقوع حادثه*' name='accidentLocation' />
            <InputField label='محل بازدید*' name='visitingLocation' />
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
            <InputField label='تلفن همراه*' name='mobileNumber' />
            <InputField label='نام مالک / راننده*' name='damagedName' />
          </FormStep>
        </MultiStepForm>
      </header>
    </div>
  );
}

export default App;
