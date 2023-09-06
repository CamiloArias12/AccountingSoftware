import React from 'react';

type InputFieldProps = {
    name: string;
    type?: 'text' | 'email' | 'date' | 'tel'| 'number';
    label: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};

const InputField: React.FC<InputFieldProps> = ({ name, type = 'text', label, value, onChange, className }) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input type={type} name={name} className={`form-control ${className}`} value={value} onChange={onChange} />
        </div>
    );
};

export default InputField;