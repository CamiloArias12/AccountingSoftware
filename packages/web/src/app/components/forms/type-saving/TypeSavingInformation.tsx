"use client"
import React from 'react';
import InputField from "@/app/components/input/InputField";

export function TypeSavingForm({ typeSaving, handleChangeTypeSaving }: { typeSaving: any, handleChangeTypeSaving: any }) {

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col space-y-4 w-full max-w-3xl p-4">
                {/* InputFields */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <InputField
                        name="idTypeSaving"
                        label="ID del Tipo de Ahorro"
                        value={typeSaving.idTypeSaving || ''}
                        onChange={handleChangeTypeSaving}
                    />

                    <InputField
                        name="nombre"
                        label="Nombre"
                        value={typeSaving.nombre}
                        onChange={handleChangeTypeSaving}
                    />
                </div>
            </div>
        </div>
    );
}

export default TypeSavingForm;
