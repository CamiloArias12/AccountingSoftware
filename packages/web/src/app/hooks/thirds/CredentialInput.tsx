import { useState } from 'react';

export function FormCredential() {
  const [credential, setCredential] = useState({
    username: '',
    password: '',
  });

  const handleChangeCredential = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setCredential((prevData) => ({ ...prevData, [name]: value }));
  };

  return {
    credential,
    setCredential,
    handleChangeCredential,
  };
}
