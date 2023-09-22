"use client"
import TypeCreditForm from "@/app/components/forms/type-credit/TypeCreditInformation";
import { useTypeCredit } from "@/app/hooks/type-credit/TypeCreditInput";
import { useState } from "react";

function CreateTypeCredit() {
    const { typeCredit, handleTypeCredit } = useTypeCredit();

    const [indexForm, setIndexForm] = useState<number>(1);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="p-10">
                <button className={`bg-[#16A5FA] p-2 ${indexForm === 1 && "bg-[#fff]"}`} onClick={() => setIndexForm(1)}>Tipo de Crédito</button>
            </div>
            <div>
                {indexForm === 1 && <TypeCreditForm typeCredit={typeCredit} handleChangeTypeCredit={handleTypeCredit} />}
            </div>
        </div>
    );
}

export default CreateTypeCredit;

