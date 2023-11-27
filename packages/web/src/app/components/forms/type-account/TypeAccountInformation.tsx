'use client';
import React from 'react';
import InputField from '@/app/components/input/InputField';
import Button from '../../input/Button';
import { optionsNature } from '@/lib/utils/type-account/options';
import SelectField from '../../input/SelectField';

export function TypeAccountForm({
  typeAccount,
  handleChangeTypeAccount,
  handleNumber,
  handleClicckAccept,
  handleClicckCancel,
  handleTypeAccount
}: {
  typeAccount: any;
  handleChangeTypeAccount: any;
  handleNumber:any,
  handleClicckAccept:any,
  handleClicckCancel:any
  handleTypeAccount:any
}) {
  return (
      <div className="flex flex-col ">
      <label className="text-center text-white  bg-[#10417B] text-input font-bold">
            Información cuenta
          </label>
          <InputField
            name="code"
            label="Código"
            value={typeAccount.code}
            onChange={handleTypeAccount}
	    onBlur={handleNumber}
	    className="mb-2"
          />

          <InputField
            name="name"
            label="Nombre"
            value={typeAccount.name}
            onChange={handleTypeAccount}
          />
	 <SelectField
            name="nature"
            options={optionsNature}
            label="Naturaleza"
            value={String(typeAccount.nature)}
            handleGeneralInformation={handleChangeTypeAccount}
	 />

      <div className="pt-10 flex justify-end">
          <div className="pr-4">
            <Button
              name="Cancelar"
              background="border border-[#10417B] text-[#10417B]"
	      onClick={handleClicckCancel}
            />
          </div>
          <Button
            name="Aceptar"
            background="bg-[#10417B] text-white"
            onClick={handleClicckAccept}
          />
        </div>


        </div>
  );
}
export default TypeAccountForm;
