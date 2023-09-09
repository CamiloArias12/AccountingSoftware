import { useState } from "react"

export function FormWorkingInformation (){

      const [workingInformation,setWorkingInformation]= useState({
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
      })

      const handleChangeWorkingInformation = (event: React.ChangeEvent<HTMLInputElement |HTMLSelectElement>) => {
	    const { name, value } = event.target;
	 setWorkingInformation(prevData => ({ ...prevData, [name]: value }));
   };


   return {
      workingInformation,
      handleChangeWorkingInformation
   };

}
