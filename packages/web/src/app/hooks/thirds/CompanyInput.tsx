import { useState } from "react";

export function FormCompanyInformation() {

    const [companyInformation, setCompanyInformation] = useState({
        typeIdentification: '',
        numberIdentification: '',
        digitVerification: '',
        regime: '',
        typePerson: '',
        socialReason: '',
        legalRepresentativeTypeIdentificatio: '',
        legalRepresentativeName: '',
        legalRepresentativeDocument: '',
        natureCompany: ''
    });

    const handleChangeCompanyInformation = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setCompanyInformation(prevData => ({ ...prevData, [name]: value }));
    };

    return {
        companyInformation,
        handleChangeCompanyInformation
    };

}
