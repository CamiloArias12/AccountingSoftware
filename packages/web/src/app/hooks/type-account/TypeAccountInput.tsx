import { TypeAccounnt } from "@/lib/utils/type-account/types";
import { useState } from "react";

export function useTypeAccount() {

    const [typeAccount, setTypeAccount] = useState<TypeAccounnt>({
        code: NaN,
        name: '',
        nature: ''
    });

    const handleTypeAccount = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setTypeAccount(prevData => ({ ...prevData, [name]: value }));
    };

    return {
        typeAccount,
        handleTypeAccount
    };
}


