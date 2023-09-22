"use client"
import { useRouter } from "next/navigation"; 

function TypeCredit() {
    const route = useRouter();

    return (
        <div>
            <button onClick={() => { route.push("/dashboard/parametrization/typecredit/create") }} className="bg-[#123344] text-[#ffffff]">Crear</button>
        </div>
    );
}

export default TypeCredit;

