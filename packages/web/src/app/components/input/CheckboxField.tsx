import React from 'react';

type CheckboxFieldProps = {
    name: string;
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function CheckboxField ({ name, label, checked, onChange } : CheckboxFieldProps)  {
    return (
        <div>
            <input 
                type="checkbox" 
                name={name} 
                id={name}
                checked={checked} 
                onChange={onChange} 
            />
            <label htmlFor={name} className="text-xs">
                {label}
            </label>
        </div>
    );
};

export default CheckboxField;


