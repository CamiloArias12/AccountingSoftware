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
}

function InputFieldSearch({
  name,
  label,
  value,
  onChange,
  onlyRead
}: InputFieldProps) {
  return (
    <div
      className={`flex flex-row m-2 md:m-0 h-[40px] shadow-sm bg-[#F8F8F8] md:bg-white rounded-lg gap-2  px-2`}
    >
      <Image
        className=" bg-[#F8F8F8]  md:bg-white "
        src={'/search.svg'}
        height={20}
        width={20}
        alt=""
      />
      <input
        type="text"
        name={name}
        defaultValue={value}
        readOnly={onlyRead}
        className={` placeholder:italic placeholder:text-[15px]  bg-[#F8F8F8] md:bg-white  text-input  flex-grow`}
        onChange={onChange}
        autoComplete="off"
        style={{ outline: 'none' }}
        placeholder="Buscar"
      />
    </div>
  )
}

export default InputFieldSearch
