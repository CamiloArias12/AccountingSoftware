'use client'
import Image from 'next/image'
import React, { useState } from 'react'

type InputFieldProps = {
  name?: string
  label?: string
  value?: string | number
  onBlur?: any
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onlyRead?: boolean
  required?: boolean
  props?: any
  error?: any
}

function InputFieldPassword({
  name,
  label,
  value,
  onChange,
  onlyRead,
  props,
  error,
  required
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div
      className={`flex  flex-grow flex-col text-input-medium  2xl:text-input `}
    >
      {label && (
        <label className={`pb-2 font-semibold flex flex-row gap-1`}>
          <span> {label}</span>
          {required && <span className="text-[#E61515]">*</span>}
        </label>
      )}
      <div className="flex flex-row h-[30px] 2xl:h-[34px] rounded-md border justify-end px-2">
        <input
          type={!showPassword ? 'password' : 'text'}
          name={name}
          defaultValue={value}
          readOnly={onlyRead}
          className={`bg-white  flex-grow`}
          onChange={onChange}
          autoComplete="off"
          style={{ outline: 'none' }}
          {...props}
        />
        <Image
          src={!showPassword ? '/show-password.svg' : '/hide-password.svg'}
          className="cursor-pointer"
          height={15}
          width={15}
          onClick={() => {
            setShowPassword(!showPassword)
          }}
          alt=""
        />
      </div>

      {error && (
        <span className={`text-[#E61515] text-xs font-semibold`}>
          {error?.message}
        </span>
      )}
    </div>
  )
}

export default InputFieldPassword
