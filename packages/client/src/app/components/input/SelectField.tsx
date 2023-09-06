import React from 'react';

type SelectFieldProps = {
    name: string;
    label: string;
    value: string;
    options: { value: string, label: string }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectField: React.FC<SelectFieldProps> = ({ name, label, value, options, onChange }) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <select name={name} className="form-select" value={value} onChange={onChange}>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
