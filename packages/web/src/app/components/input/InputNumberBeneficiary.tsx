import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

type InputNumberProps = {
  label?: string
  name: string
  handleChange?: any
  value?: any
  onChange?: boolean
  className?: string
  suffix?: string
  prefix?: string
  readonly?: boolean
  thousandSeparator?: string
  width?: string
  control?: any
  isString?: boolean
  error?: any
  required?: boolean
  setValue?: any
}

function InputNumberBeneficiary({
  name,
  label,
  handleChange,
  value,
  onChange,
  className,
  suffix,
  prefix,
  readonly,
  thousandSeparator,
  width,
  control,
  isString,
  error,
  required,
  setValue
}: InputNumberProps) {
  return (
    <div
      className={`flex  ${width ? width : 'flex-grow'} flex-col text-input-medium 2xl:text-input  `}
    >
      {label && (
        <label className={`pb-2 font-semibold flex flex-row gap-1`}>
          <span>{label}</span>
          {required && <span className="text-[#E61515]">*</span>}
        </label>
      )}
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <NumericFormat
              className={`${
                className
                  ? className
                  : 'h-[30px] 2xl:h-[34px] pl-2 rounded-md border  border-[#d9d9d9]'
              } `}
              defaultValue={value}
              autoComplete="off"
              name={name}
              thousandSeparator={thousandSeparator}
              suffix={suffix}
              prefix={prefix}
              readOnly={readonly}
              onValueChange={values => {
                if (isString) {
                  onChange(values.value)
                } else {
                  if (values.value === '') {
                    console.log('Empty')

                    setValue(name, 'afsdfldskflsd')
                  }
                  onChange(values.floatValue)
                }
              }}
              onBlur={onBlur}
            />
          )}
        />
      ) : (
        <NumericFormat
          className={`${
            className ? className : 'h-[30px] pl-2 border  border-[#d9d9d9]'
          } `}
          defaultValue={value}
          name={name}
          thousandSeparator={thousandSeparator}
          suffix={suffix}
          prefix={prefix}
          readOnly={readonly}
          onValueChange={
            onChange
              ? handleChange
              : (values, sourceInfo) => {
                  handleChange(name, values.floatValue)
                }
          }
        />
      )}
      {error && (
        <span className={`text-[#FF0000] text-xs font-semibold`}>
          {error?.message}
        </span>
      )}
    </div>
  )
}

export default InputNumberBeneficiary
