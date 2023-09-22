"use client"
import TypeSavingForm from "@/app/components/forms/type-saving/TypeSavingInformation";
import { useTypeSaving } from "@/app/hooks/type-saving/TypeSavingInput";
import { useState } from "react";

function CreateTypeSaving() {
    const { typeSaving, handleTypeSaving } = useTypeSaving();

    const [indexForm, setIndexForm] = useState<number>(1);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="p-10">
                <button className={`bg-[#16A5FA] p-2 ${indexForm === 1 && "bg-[#fff]"}`} onClick={() => setIndexForm(1)}>Tipo de Ahorro</button>
            </div>
            <div>
                {indexForm === 1 && <TypeSavingForm typeSaving={typeSaving} handleChangeTypeSaving={handleTypeSaving} />}
            </div>
        </div>
    );
}

export default CreateTypeSaving;

