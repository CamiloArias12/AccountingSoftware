import InputField from '@/app/components/input/InputField';
import SelectField from '@/app/components/input/SelectField';
import React, { useState } from 'react';

const Formulario2: React.FC = () => {
    const initialData = {
        empresa: '',
        cargo: '',
        direccion: '',
        telefono: '',
        correoLaboral: '',
        sueldo: 0,
        ingresoEmpresa: new Date(),
        banco: '',
        tipoCuenta: '',
        numero: ''
    };

    const [data, setData] = useState(initialData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Lógica al enviar el formulario
    };

    return (
        <div>
            <h1>INFORMACIÓN LABORAL</h1>
            <form onSubmit={handleSubmit}>
                <InputField 
                    name="empresa"
                    label="Empresa"
                    value={data.empresa}
                    onChange={handleChange}
                />

                <InputField 
                    name="cargo"
                    label="Cargo"
                    value={data.cargo}
                    onChange={handleChange}
                />

                <InputField 
                    name="direccion"
                    label="Dirección"
                    value={data.direccion}
                    onChange={handleChange}
                />

                <InputField 
                    type="tel"
                    name="telefono"
                    label="Teléfono"
                    value={data.telefono}
                    onChange={handleChange}
                />

                <InputField 
                    type="email"
                    name="correoLaboral"
                    label="Correo Laboral"
                    value={data.correoLaboral}
                    onChange={handleChange}
                />

                <InputField 
                    type="number"
                    name="sueldo"
                    label="Sueldo"
                    value={data.sueldo}
                    onChange={handleChange}
                />

                <InputField 
                    type="date"
                    name="ingresoEmpresa"
                    label="Ingreso a la Empresa"
                    value={data.ingresoEmpresa?.toISOString().substr(0, 10) || ''}
                    onChange={handleChange}
                />

                <InputField 
                    name="banco"
                    label="Banco"
                    value={data.banco}
                    onChange={handleChange}
                />

                <SelectField 
                    name="tipoCuenta"
                    label="Tipo de Cuenta"
                    value={data.tipoCuenta}
                    options={[
                        { value: '', label: 'Seleccionar...' },
                        { value: 'Ahorros', label: 'Ahorros' },
                        { value: 'Corriente', label: 'Corriente' }
                    ]}
                    onChange={handleChange}
                />

                <InputField 
                    name="numero"
                    label="Número de Cuenta"
                    value={data.numero}
                    onChange={handleChange}
                />

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Formulario2;
