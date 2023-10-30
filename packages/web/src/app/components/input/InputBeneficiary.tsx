'use client';
import React, { useState } from 'react';

type InputFieldProps = {
  name?: string;
  type?: string;
  label: string;
  value?: string | number;
  onBlur?: any;
  index?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputFieldBeneficiary({
  name,
  type,
  label,
  value,
  onChange,
  onBlur,
  index,
}: InputFieldProps) {
  const [color, setColor] = useState(false);

  return (
    <div className="flex flex-col pr-4 ">
      <label className={`text-input pb-2`}>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        required
        className={`bg-white h-[30px] text-input rounded-sm border ${
          !color ? 'border-[#d9d9d9]' : 'border-[#AD1A1A]'
        } h-[27px] `}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}

export default InputFieldBeneficiary;
