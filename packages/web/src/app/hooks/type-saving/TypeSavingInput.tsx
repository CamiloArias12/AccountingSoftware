import { useState } from "react";

export function useTypeSaving() {

    const [typeSaving, setTypeSaving] = useState({
        idTypeSaving: null,
        nombre: ''
    });

    const handleTypeSaving = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTypeSaving(prevData => ({ ...prevData, [name]: value }));
    };

    return {
        typeSaving,
        handleTypeSaving
    };
}
