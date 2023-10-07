import InputField from '@/app/components/input/InputField';
import SelectField from '@/app/components/input/SelectField';
import {AccountTypeOptions } from '@/lib/utils/thirds/selectForm';
import { IAfiliate } from '@/lib/utils/thirds/types';
import InputCalendar from '../../input/Calendar';

function WorkingInformtaion({ workingInformation, handleChangeWorkingInformation }: { workingInformation: IAfiliate, handleChangeWorkingInformation: any }) {

    return (
            <div className="flex-grow grid grid-cols-2 gap-4 lg:grid-cols-3">

                <InputField
                    type="text"
                    name="company"
                    label="Empresa"
                    value={workingInformation.company}
                    onChange={handleChangeWorkingInformation}
                />
	        <InputField
                    type="text"
                    name="jobTitle"
                    label="Cargo"
                    value={workingInformation.jobTitle}
                    onChange={handleChangeWorkingInformation}
                />

                <InputField
                    type="text"
                    name="addreesCompany"
                    label="Dirección"
                    value={workingInformation.addreesCompany}
                    onChange={handleChangeWorkingInformation}
                />

                <InputField
                    type="email"
                    name="emailJob"
                    label="Correo laboral"
                    value={workingInformation.emailJob}
                    onChange={handleChangeWorkingInformation}
                />
	      
		  <InputField
                    type="text"
                    name="incomeCompany"
                    label="Ingreso"
                    value={workingInformation.incomeCompany}
                    onChange={handleChangeWorkingInformation}
                />

                <InputField
                    type="text"
                    name="salary"
                    label="Sueldo"
                    value={workingInformation.salary}
                    onChange={handleChangeWorkingInformation}
                />

                <InputField
                    type="text"
                    name="bank"
                    label="Banco"
                    value={workingInformation.bank}
                    onChange={handleChangeWorkingInformation}
                />

               
	        <SelectField
		     name="typeAccount"
		     value={"Ahorro"}
		     handleGeneralInformation={handleChangeWorkingInformation}
		     options={AccountTypeOptions}
		     label="Tipo decuenta"
		     image={false}
                />

                <InputField
                    name="numberAccount"
                    label="Número de Cuenta"
                    value={workingInformation.numberAccount}
                    onChange={handleChangeWorkingInformation}
                />
            </div>
    );
}

export default WorkingInformtaion;

