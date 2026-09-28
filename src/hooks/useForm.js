import { useState } from "react";

export default function useForm(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const setFieldValue = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const reset = (newValues) => {
    setValues(newValues || initialValues);
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    for (const field in validationRules) {
      const rule = validationRules[field];
      const value = values[field];
      const message = rule(value, values);
      if (message) newErrors[field] = message;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, setFieldValue, setValues, validate, reset };
}