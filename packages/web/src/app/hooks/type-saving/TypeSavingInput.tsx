import { useState } from 'react';

export function useTypeSaving() {
  const [typeSaving, setTypeSaving] = useState({
    name: '',
  });
  const handleTypeSaving = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTypeSaving((prevData) => ({ ...prevData, [name]: value }));
  };

  return {
    typeSaving,
    setTypeSaving,
    handleTypeSaving,
  };
}
