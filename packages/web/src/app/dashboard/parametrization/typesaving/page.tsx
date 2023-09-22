"use client"
import { useRouter } from "next/navigation"; 

function TypeSaving() {
    const route = useRouter();

    return (
        <div>
            <button onClick={() => { route.push("/dashboard/parametrization/typesaving/create") }} className="bg-[#123344] text-[#ffffff]">Crear</button>
        </div>
    );
}

export default TypeSaving;

