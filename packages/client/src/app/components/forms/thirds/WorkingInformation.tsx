import InputField from '@/app/components/input/InputField';
import SelectField from '@/app/components/input/SelectField';


function WorkingInformtaion({workingInformation,handleChangeWorkingInformation}:{workingInformation:any, handleChangeWorkingInformation:any}){

    return (
        <div>
                <InputField 
                    name="empresa"
                    label="Empresa"
                    value={workingInformation.empresa}
                    onChange={handleChangeWorkingInformation}
                />

                <InputField 
                    name="cargo"
                    label="Cargo"
                    value={workingInformation.cargo}
                    onChange={handleChangeWorkingInformation}
                />

                <InputField 
                    name="direccion"
                    label="Dirección"
                    value={workingInformation.direccion}
                    onChange={handleChangeWorkingInformation}
                />

                <InputField 
                    type="tel"
                    name="telefono"
                    label="Teléfono"
                    value={workingInformation.telefono}
                    onChange={handleChangeWorkingInformation}
                />

                <InputField 
                    type="email"
                    name="correoLaboral"
                    label="Correo Laboral"
                    value={workingInformation.correoLaboral}
                    onChange={handleChangeWorkingInformation}
                />

                <InputField 
                    type="number"
                    name="sueldo"
                    label="Sueldo"
                    value={workingInformation.sueldo}
                    onChange={handleChangeWorkingInformation}
                />

                <InputField 
                    type="date"
                    name="ingresoEmpresa"
                    label="Ingreso a la Empresa"
                    value={workingInformation.ingresoEmpresa?.toISOString().substr(0, 10) || ''}
                    onChange={handleChangeWorkingInformation}
                />

                <InputField 
                    name="banco"
                    label="Banco"
                    value={workingInformation.banco}
                    onChange={handleChangeWorkingInformation}
                />

                <SelectField 
                    name="tipoCuenta"
                    label="Tipo de Cuenta"
                    value={workingInformation.tipoCuenta}
                    options={[
                        { value: '', label: 'Seleccionar...' },
                        { value: 'Ahorros', label: 'Ahorros' },
                        { value: 'Corriente', label: 'Corriente' }
                    ]}
                    onChange={handleChangeWorkingInformation}
                />

                <InputField 
                    name="numero"
                    label="Número de Cuenta"
                    value={workingInformation.numero}
                    onChange={handleChangeWorkingInformation}
                />
        </div>
    );
}

export default WorkingInformtaion;
