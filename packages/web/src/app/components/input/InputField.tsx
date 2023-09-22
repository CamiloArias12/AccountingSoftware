import React from 'react';

type InputFieldProps = {
    name: string;
    type?: 'text' | 'email' | 'date' | 'tel'| 'number';
    label: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};

function InputField ({ name, type = 'text', label, value, onChange, className }:InputFieldProps) {
    return (
        <div className="flex flex-col ">
            <label className="text-sm pb-2">{label}</label>
            <input type={type} name={name}   className="bg-white rounded-sm border border-zinc-100 p-[5px]" value={value} onChange={onChange} />
        </div>
    );
};

export default InputField;
