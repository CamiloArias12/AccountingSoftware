import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import './calendar.css'
import { Controller } from 'react-hook-form'
interface InputCalendarProps {
  name: string
  label: string
  value?: Date
  onChange?: any
  showMonthYearPicker?: boolean
  control?: any
  required?: any
  rules?: any
  error?: any
  onlyRead?: boolean
}
function InputCalendar({
  label,
  value,
  name,
  onChange,
  showMonthYearPicker,
  control,
  error,
  required,
  rules,
  onlyRead
}: InputCalendarProps) {
  const [date, setDate] = useState(null)
  if (!control) {
    useEffect(() => {
      setDate(value)
    }, [value])
  }

  return (
    <div className="flex  flex-grow  flex-col text-input-medium 2xl:text-input ">
      <label className={`pb-2 font-semibold flex flex-row gap-1`}>
        <span>{label}</span>
        {required && <span className="text-[#E61515]">*</span>}
      </label>
      {control ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({
            field: { onChange, onBlur, value, ref },
            formState: { dirtyFields }
          }) => (
            <DatePicker
              onChange={onChange}
              selected={value}
              dateFormat={showMonthYearPicker ? 'MM/yyyy' : 'dd/MM/yyyy'}
              showMonthYearPicker={showMonthYearPicker}
              onBlur={onBlur} // notify when input is touched/blur
              readOnly={onlyRead}
              onClick={() => {
                console.log('dirtyFields', dirtyFields)
              }}
            />
          )}
        />
      ) : (
        <DatePicker
          onChange={(event: any) => {
            setDate(event)
            onChange(name, event)
          }}
          selected={date}
          dateFormat={showMonthYearPicker && 'MM/yyyy'}
          showMonthYearPicker={showMonthYearPicker}
          onlyRead={onlyRead}
        />
      )}

      {error && (
        <span className={`text-[#E61515] text-xs font-semibold`}>
          {error?.message}
        </span>
      )}
    </div>
  )
}

export default InputCalendar
