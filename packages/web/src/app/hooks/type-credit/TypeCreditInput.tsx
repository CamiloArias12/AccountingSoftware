import { useState } from "react";

export function useTypeCredit() {

    const [typeCredit, setTypeCredit] = useState({
        idTypeCredit: null,
        nombre: ''
    });

    const handleTypeCredit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTypeCredit(prevData => ({ ...prevData, [name]: value }));
    };

    return {
        typeCredit,
        handleTypeCredit
    };
}
