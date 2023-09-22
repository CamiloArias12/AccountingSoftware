import React, { useState } from 'react';
import InputField from '../../input/InputField';

export function BeneficiaryInformation({beneficiaryInformation, handleChangeBeneficiaryInformation}: 
    {beneficiaryInformation: any, handleChangeBeneficiaryInformation: any}) {

    
    return (
        <div className="flex flex-col items-center justify-center ">
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

