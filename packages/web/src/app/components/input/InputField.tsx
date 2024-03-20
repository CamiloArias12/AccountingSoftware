'use client'
import React, { useState } from 'react'

type InputFieldProps = {
  name?: string
  type?: string
  label?: string
  value?: string | number
  onBlur?: any
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onlyRead?: boolean
  required?: boolean
  props?: any
  error?: any
  className?: string
}

function InputField({
  name,
  label,
  value,
  onChange,
  onlyRead,
  props,
  error,
  required,
  className
}: InputFieldProps) {
  return (
    <div
      className={`flex  flex-grow flex-col text-input-medium 2xl:text-input `}
    >
      {label && (
        <label
          htmlFor={name}
          className={`pb-2 font-semibold flex flex-row gap-1`}
        >
          <span> {label}</span>
          {required && <span className="text-[#E61515]">*</span>}
        </label>
      )}
      <input
        type="text"
        id={name}
        name={name}
        defaultValue={value}
        readOnly={onlyRead}
        className={`${
          className ? className : 'h-[30px] 2xl:h-[34px]'
        } rounded-md pl-2 border border-[#d9d9d9]
               `}
        onChange={onChange}
        autoComplete="off"
        {...props}
      />

      {error && (
        <span className={`text-[#E61515] text-xs font-semibold`}>
          {error?.message}
        </span>
      )}
    </div>
  )
}

export default InputField
