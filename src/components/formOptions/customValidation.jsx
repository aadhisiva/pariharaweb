/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';

export const useForm = ({
  initialValues,
  validationSchema,
  onSubmit,
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    const newValue = files ? files[0] : value;
    setValues({
      ...values,
      [name]: newValue,
    });
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    validateForm();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm();
    setIsSubmitting(true);
  };

  const validateForm = () => {
    const validationErrors = {};
    Object.keys(validationSchema).forEach((key) => {
      const fieldValue = values[key];
      const fieldRules = validationSchema[key];
      const fieldError = fieldRules.validate(fieldValue);
      if (fieldError) {
        validationErrors[key] = fieldError;
      }
    });
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Effect to handle form submission
  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        onSubmit(values);
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting, onSubmit, values]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  };
};

