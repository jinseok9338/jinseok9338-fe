import { useEffect, useState } from 'react';
import { isValidId, isValidPassword } from '../utilities';

export const useForm = (type: 'id' | 'password') => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (type === 'id') {
      if (isValidId(e.target.value)) {
        setError(false);
      }
    } else if (type === 'password') {
      if (isValidPassword(e.target.value)) {
        setError(false);
      }
    }
  };

  const onBlur = () => {
    if (type === 'id') {
      if (isValidId(value)) {
        setError(false);
      } else {
        setError(true);
      }
    } else if (type === 'password') {
      if (isValidPassword(value)) {
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  // return value, onchange, errors

  return {
    value,
    onChange,
    onBlur,
    error,
  };
};
