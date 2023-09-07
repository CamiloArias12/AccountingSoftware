import InputField from "@/app/components/input/InputField";
import SelectField from "@/app/components/input/SelectField";
import { Regime, TypePerson } from "@/lib/utils/thirds/enumThirds";
import { RegimeForm, TypePersonForm } from "@/lib/utils/thirds/selectForm";
import React from 'react';

export function ProviderCompany({ companyInformation, handleChangeCompanyInformation }:
    { companyInformation: any, handleChangeCompanyInformation: any }) {

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col space-y-4 w-full max-w-3xl p-4">

                {/* SelectFields */}
                <div className="space-y-4">
                    <SelectField
                        name="typeIdentification"
                        label="Tipo de Identificación"
                        value={companyInformation.typeIdentification}
                        options={TypePersonForm}
                        onChange={handleChangeCompanyInformation}
                    />

                    <SelectField
                        name="regime"
                        label="Régimen"
                        value={companyInformation.regime}
                        options={RegimeForm}
                        onChange={handleChangeCompanyInformation}
                    />

                    <SelectField
                        name="typePerson"
                        label="Tipo de Persona"
                        value={companyInformation.typePerson}
                        options={TypePersonForm}
                        onChange={handleChangeCompanyInformation}
                    />

                    <SelectField
                        name="legalRepresentativeTypeIdentificatio"
                        label="Tipo de Identificación del Representante Legal"
                        value={companyInformation.legalRepresentativeTypeIdentificatio}
                        options={TypePersonForm}
                        onChange={handleChangeCompanyInformation}
                    />
                </div>

                {/* InputFields */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <InputField
                        name="numberIdentification"
                        label="Número de Identificación"
                        value={companyInformation.numberIdentification.toString()}
                        onChange={handleChangeCompanyInformation}
                    />

                    <InputField
                        name="digitVerification"
                        label="Dígito de Verificación"
                        value={companyInformation.digitVerification.toString()}
                        onChange={handleChangeCompanyInformation}
                    />

                    <InputField
                        name="socialReason"
                        label="Razón Social"
                        value={companyInformation.socialReason}
                        onChange={handleChangeCompanyInformation}
                    />

                    <InputField
                        name="legalRepresentativeName"
                        label="Nombre del Representante Legal"
                        value={companyInformation.legalRepresentativeName}
                        onChange={handleChangeCompanyInformation}
                    />

                    <InputField
                        name="legalRepresentativeDocument"
                        label="Documento del Representante Legal"
                        value={companyInformation.legalRepresentativeDocument}
                        onChange={handleChangeCompanyInformation}
                    />

                    <InputField
                        name="natureCompany"
                        label="Naturaleza de la Empresa"
                        value={companyInformation.natureCompany}
                        onChange={handleChangeCompanyInformation}
                    />
                </div>

            </div>
        </div>
    );
}

export default ProviderCompany;



