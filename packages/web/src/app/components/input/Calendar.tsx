import { useState } from 'react';

import DatePicker from 'react-date-picker';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
interface InputCalendarProps {
  name: string;
  label: string;
  value: Date;
  onChange: any;
}
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function InputCalendar({ label, value, name, onChange }: InputCalendarProps) {
  const [date, setDate] = useState<Value>(value);
  return (
    <div className="flex  flex-grow  flex-col text-input pr-2">
      <label className="mb-2">{label}</label>
      <DatePicker
        onChange={(event: any) => {
          setDate(event);
          onChange(name, event);
        }}
        value={date}
      />
    </div>
  );
}

export default InputCalendar;
