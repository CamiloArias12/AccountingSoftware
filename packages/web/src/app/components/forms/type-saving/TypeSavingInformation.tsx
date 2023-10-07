"use client"
import  { useState } from 'react';
import InputField from "@/app/components/input/InputField";
import { gql,useQuery } from "@apollo/client";
import Select from '../../input/Select';
import Button from '../../input/Button';


 const AUXLILIARIES=gql`
query {
  getAuxilaryAll{
    type
    typeAccount {
      code
      name
      nature
      state
    }
    
  }
  }
`


export function TypeSavingForm(){

    const {data,loading}=useQuery(AUXLILIARIES)
    const [accounts,setAccounts]=useState<number[]>([])

     const [typeCredit, setTypeCredit] = useState({
        nombre: ''
    });

    const handleTypeSaving= (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTypeCredit(prevData => ({ ...prevData, [name]: value }));
    };


    const addAccount= () => {
	 setAccounts([...accounts,0])
      }
    return (
        <div className="flex flex-col   w-full h-full">
            <div className="flex flex-col space-y-4 w-full max-w-3xl p-4">
                {/* InputFields */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <InputField
                        name="nombre"
                        label="Nombre"
                        value={typeCredit.nombre}
                        onChange={handleTypeSaving}
                    />

		  <label>Cuentas</label>	
		  <button onClick={addAccount}>Agregar</button>
		  {accounts.map((index) => (
		     <Select options={data.getAuxilaryAll} index={index} onClick={()=>{}} setValue={()=> {}}/>
		     )
		  )

		  }
	        

                </div>
            </div>
	    <div className="pt-10 flex justify-end">
		  <div className="pr-4">
		     <Button name="Cancelar" background="border border-[#10417B] text-[#10417B]" />
		  </div>
		  <div className="pr-4">
		     <Button name="Aceptar" background="bg-[#10417B] text-white" />
		  </div>
	       </div>

        </div>
    );
}

export default TypeSavingForm;
