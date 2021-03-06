import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import FormNavigation from './FormNavigation';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const MultiStepForm = ({ children, initialValues, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[currentStep];
  const totalStep = steps.length;
  const isLastStep = currentStep === totalStep - 1;

  const next = (values) => {
    setSnapshot(values);
    setCurrentStep(currentStep + 1);
  };
  const previous = (values) => {
    setSnapshot(values);
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (values, actions) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, actions);
    }
    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      next(values);
    }
  };

  return (
    <div>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}
      >
        {(formik) => (
          <Form>
            <Stepper activeStep={currentStep} style={{ marginBottom: '20px' }}>
              {steps.map((step) => {
                const label = step.props.stepName;
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {step}
            <FormNavigation
              isLastStep={isLastStep}
              hasPrevious={currentStep > 0}
              onBackClick={() => previous(formik.values)}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultiStepForm;
