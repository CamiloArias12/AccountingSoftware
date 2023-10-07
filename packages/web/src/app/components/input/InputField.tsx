"use client"
import React, { useState } from 'react';

type InputFieldProps = {
    name?: string;
    type?: string;
    label: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField ({ name, type , label, value, onChange}:InputFieldProps) {
    return (
        <div className="flex flex-col ">
            <label className={`text-sm pb-2`}>{label}</label>
            <input type="text" name={name}  required className="bg-white rounded-sm border border-zinc-100 py-[0.375rem]" value={value} onChange={onChange} />
        </div>
    );
};

export default InputField;
