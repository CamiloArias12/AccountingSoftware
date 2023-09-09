import { useState } from "react";

export function FormBeneficiaryInformation() {
    const [beneficiaryInformation, setBeneficiaryInformation] = useState({
        idDocument: '',
        name: '',
        beneficiaryAffiliate: []
    });

    const handleChangeBeneficiaryInformation = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBeneficiaryInformation(prevData => ({ ...prevData, [name]: value }));
    };

    return {
        beneficiaryInformation,
        handleChangeBeneficiaryInformation
    };
}
