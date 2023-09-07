"use client";
import BeneficiaryInformation from "@/app/components/forms/thirds/BeneficiaryInformation";
import GeneralInformation from "@/app/components/forms/thirds/GeneralInformation";
import WorkingInformation from "@/app/components/forms/thirds/WorkingInformation";
import { FormGeneralInformation } from "@/app/hooks/thirds/GeneralInput";
import { FormWorkingInformation } from "@/app/hooks/thirds/WorkingInput";
import { FormBeneficiaryInformation } from "@/app/hooks/thirds/BeneficiaryInput";
import { useState } from "react";
import ProviderCompany from "@/app/components/forms/thirds/ProviderCompany";
import { FormCompanyInformation } from "@/app/hooks/thirds/CompanyInput";

function CreateThird() {  // Cambié el nombre a CreateEntity para hacerlo más general
    const { generalInformation, handleChangeGeneralInformation } = FormGeneralInformation();
    const { workingInformation, handleChangeWorkingInformation } = FormWorkingInformation();
    const { beneficiaryInformation, handleChangeBeneficiaryInformation } = FormBeneficiaryInformation();
    const { companyInformation, handleChangeCompanyInformation } = FormCompanyInformation();

    const [indexForm, setIndexForm] = useState<number>(1);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="p-10">
                <button className={`bg-[#16A5FA] p-2 ${indexForm === 1 && "bg-[#fff]"}`} onClick={() => setIndexForm(1)}>Informacion general</button>
                <button className={`bg-[#16A5FA] p-2 ${indexForm === 2 && "bg-[#fff]"}`} onClick={() => setIndexForm(2)}>Informacion laboral</button>
                <button className={`bg-[#16A5FA] p-2 ${indexForm === 3 && "bg-[#fff]"}`} onClick={() => setIndexForm(3)}>Beneficiarios</button>
                <button className={`bg-[#16A5FA] p-2 ${indexForm === 4 && "bg-[#fff]"}`} onClick={() => setIndexForm(4)}>Compañía</button>
            </div>
            <div>
                {indexForm === 1 && <GeneralInformation generalInformation={generalInformation} handleChangeGeneralInformation={handleChangeGeneralInformation} />}
                {indexForm === 2 && <WorkingInformation workingInformation={workingInformation} handleChangeWorkingInformation={handleChangeWorkingInformation} />}
                {indexForm === 3 && <BeneficiaryInformation beneficiaryInformation={beneficiaryInformation} handleChangeBeneficiaryInformation={handleChangeBeneficiaryInformation} />}
                {indexForm === 4 && <ProviderCompany companyInformation={companyInformation} handleChangeCompanyInformation={handleChangeCompanyInformation} />}  
            </div>
        </div>
    );
}

export default CreateThird;

