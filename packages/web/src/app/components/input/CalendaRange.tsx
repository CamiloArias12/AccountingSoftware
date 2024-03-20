import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import './calendar.css'
import { Controller } from 'react-hook-form'
interface InputCalendarProps {
  label: string
  onChange?: any
  required?: any
  startDate: any
  endDate: any
}
function InputCalendarRange({
  label,
  onChange,
  required,
  startDate,
  endDate
}: InputCalendarProps) {
  return (
    <div className="flex  flex-grow  flex-col text-input ">
      <label className={`pb-2 font-semibold flex flex-row gap-1`}>
        <span>{label}</span>
        {required && <span className="text-[#A10909]">*</span>}
      </label>
      <div className="flex flex-row  gap-2 ">
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => onChange('startDate', date)}
          selectsStart
          startDate={startDate}
          required
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => onChange('endDate', date)}
          selectsStart
          selectsEnd
          required
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
    </div>
  )
}

export default InputCalendarRange
