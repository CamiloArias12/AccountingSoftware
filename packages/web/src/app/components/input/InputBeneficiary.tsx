'use client'
import React, { useState } from 'react'

type InputFieldProps = {
  name?: string
  type?: string
  label?: string
  value?: string | number
  onBlur?: any
  index?: number
  className?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function InputFieldBeneficiary({
  name,
  type,
  label,
  value,
  onChange,
  onBlur,
  className
}: InputFieldProps) {
  const [color, setColor] = useState(false)

  return (
    <div className={`flex flex-col  ${className} `}>
      {label && (
        <label className={` font-semibold text-input pb-2`}>{label}</label>
      )}
      <input
        type="text"
        name={name}
        value={value}
        required
        className={`bg-white h-[30px] 2xl:h-[34px] rounded-md text-input  border ${
          !color ? 'border-[#d9d9d9]' : 'border-[#AD1A1A]'
        } h-[27px] `}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

export default InputFieldBeneficiary
