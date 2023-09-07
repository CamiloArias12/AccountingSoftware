import InputField from "@/app/components/input/InputField";
import React from 'react';

export function BeneficiaryInformation({beneficiaryInformation, handleChangeBeneficiaryInformation}: 
    {beneficiaryInformation: any, handleChangeBeneficiaryInformation: any}) {
    
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            
            <InputField
                name="idDocument"
                label="ID Documento"
                value={beneficiaryInformation.idDocument}
                onChange={handleChangeBeneficiaryInformation}
            />

            <InputField
                name="name"
                label="Nombre"
                value={beneficiaryInformation.name}
                onChange={handleChangeBeneficiaryInformation}
            />

        </div>
    );
}

export default BeneficiaryInformation;

