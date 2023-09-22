import { useState } from "react";

export function useTypeAccount() {

    const [typeAccount, setTypeAccount] = useState({
        code: null,
        name: '',
        nature: '',
        account: null,
        auxiliary: null,
        group: null,
        classAccount: null,
        subAccount: null
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


