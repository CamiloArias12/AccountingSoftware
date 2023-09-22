"use client"
import React from 'react';
import InputField from "@/app/components/input/InputField";

export function TypeCreditForm({ typeCredit, handleChangeTypeCredit }: { typeCredit: any, handleChangeTypeCredit: any }) {

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col space-y-4 w-full max-w-3xl p-4">
                {/* InputFields */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <InputField
                        name="idTypeCredit"
                        label="ID del Tipo de Crédito"
                        value={typeCredit.idTypeCredit || ''}
                        onChange={handleChangeTypeCredit}
                    />

                    <InputField
                        name="nombre"
                        label="Nombre"
                        value={typeCredit.nombre}
                        onChange={handleChangeTypeCredit}
                    />
                </div>
            </div>
        </div>
    );
}

export default TypeCreditForm;
