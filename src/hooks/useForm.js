import { useState } from 'react';

export default function useForm({ initialValues }) {
  const [values, setValues] = useState(initialValues || {});

  const handleChange = (event) => {
    const { value } = event.target;
    const { name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    handleChange,
    values,
  };
}
