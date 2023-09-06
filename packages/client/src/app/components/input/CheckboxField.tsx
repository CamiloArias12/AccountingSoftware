import React from 'react';

type CheckboxFieldProps = {
    name: string;
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({ name, label, checked, onChange }) => {
    return (
        <div>
            <input 
                type="checkbox" 
                name={name} 
                id={name}
                checked={checked} 
                onChange={onChange} 
            />
            <label htmlFor={name}>
                {label}
            </label>
        </div>
    );
};

export default CheckboxField;


