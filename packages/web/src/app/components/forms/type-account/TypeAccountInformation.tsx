"use client"
import React from 'react';
import InputField from "@/app/components/input/InputField";

export function TypeAccountForm({ typeAccount, handleChangeTypeAccount }: { typeAccount: any, handleChangeTypeAccount: any }) {

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col space-y-4 w-full max-w-3xl p-4">

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <InputField
                        name="code"
                        label="Código"
                        value={typeAccount.code || ''}
                        onChange={handleChangeTypeAccount}
                    />

                    <InputField
                        name="name"
                        label="Nombre"
                        value={typeAccount.name}
                        onChange={handleChangeTypeAccount}
                    />

                    <InputField
                        name="nature"
                        label="Naturaleza"
                        value={typeAccount.nature}
                        onChange={handleChangeTypeAccount}
                    />
                </div>
            </div>
        </div>
    );
}
export default TypeAccountForm;

