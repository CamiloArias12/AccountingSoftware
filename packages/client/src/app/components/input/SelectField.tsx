import React from 'react';

type SelectFieldProps = {
    name: string;
    label: string;
    value: string;
    options: { value: string, label: string }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectField ({ name, label, value, options, onChange }:SelectFieldProps) {
    return (
        <div className="">
            <label className="text-xs">{label}</label>
            <select name={name} className="form-select" value={value} onChange={onChange}>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
