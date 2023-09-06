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
        <div className="flex flex-col pb-4">
            <label className="text-xs pb-2">{label}</label>
            <input type={type} name={name}   className={`border-2 rounded-sm ${className}`} value={value} onChange={onChange} />
        </div>
    );
};

export default InputField;
