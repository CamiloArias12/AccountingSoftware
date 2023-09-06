import InputField from '@/app/components/input/InputField';
import React, { useState } from 'react';

const Formulario3: React.FC = () => {
    const initialData = {
        sueldo: 0,
        otrosIngresos: 0,
        totalIngresos: 0,
        totalActivos: 0,
        totalPasivos: 0
    };

    const [data, setData] = useState(initialData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: parseFloat(value) }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Lógica al enviar el formulario
    };

    return (
        <div>
            <h1>INFORMACIÓN FINANCIERA</h1>
            <form onSubmit={handleSubmit}>
                <InputField
                    type="number"
                    name="sueldo"
                    label="Sueldo"
                    value={data.sueldo}
                    onChange={handleChange}
                />

                <InputField
                    type="number"
                    name="otrosIngresos"
                    label="Otros Ingresos"
                    value={data.otrosIngresos}
                    onChange={handleChange}
                />

                <InputField
                    type="number"
                    name="totalIngresos"
                    label="Total Ingresos"
                    value={data.totalIngresos}
                    onChange={handleChange}
                />

                <InputField
                    type="number"
                    name="totalActivos"
                    label="Total Activos"
                    value={data.totalActivos}
                    onChange={handleChange}
                />

                <InputField
                    type="number"
                    name="totalPasivos"
                    label="Total Pasivos"
                    value={data.totalPasivos}
                    onChange={handleChange}
                />

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Formulario3;
