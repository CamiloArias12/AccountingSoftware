import InputField from '@/app/components/input/InputField';
import SelectField from '@/app/components/input/SelectField';
import { AccountTypeOptions } from '@/lib/utils/thirds/selectForm';
import { IAfiliate } from '@/lib/utils/thirds/types';
import InputCalendar from '../../input/Calendar';

function WorkingInformtaion({
  workingInformation,
  handleChangeWorkingInformation,
  handleNumber,
  handleWorkingInformation,
}: {
  handleWorkingInformation: any;
  handleNumber: any;
  workingInformation: IAfiliate;
  handleChangeWorkingInformation: any;
}) {
  console.log(workingInformation);
  return (
    <div className="flex-grow grid grid-cols-2 gap-4 lg:grid-cols-4">
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
        name="phone"
        label="Telefono"
        onBlur={handleNumber}
        value={workingInformation.phone}
        onChange={handleChangeWorkingInformation}
      />

      <InputCalendar
        name="incomeCompany"
        label="Fecha de ingreso"
        value={workingInformation.incomeCompany}
        onChange={handleWorkingInformation}
      />

      <InputField
        type="text"
        name="salary"
        label="Sueldo"
        onBlur={handleNumber}
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
        value={workingInformation.typeAccount}
        handleGeneralInformation={handleWorkingInformation}
        options={AccountTypeOptions}
        label="Tipo decuenta"
        image={false}
      />

      <InputField
        name="numberAccount"
        label="Número de Cuenta"
        value={workingInformation.numberAccount}
        onBlur={handleNumber}
        onChange={handleChangeWorkingInformation}
      />
    </div>
  );
}

export default WorkingInformtaion;
