import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import FormNavigation from './FormNavigation';

const MultiStepForm = ({ children, initialValues, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = React.children.toArray(children);
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
      await step.props.onSubmit(values);
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
      {' '}
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}
      >
        {(formik) => (
          <Form>
            <FormNavigation
              isLastStep={isLastStep}
              hasPrevious={currentStep > 0}
              onBackClick={previous(formik.values)}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultiStepForm;

export const FormStep = ({ stepName = '', children }) => children;
