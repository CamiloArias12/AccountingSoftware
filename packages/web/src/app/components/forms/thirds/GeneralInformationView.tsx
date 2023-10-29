import { GeneralInformationData } from "@/lib/utils/thirds/types";
import { LabelView } from "../../input/LabelView";


interface GeneralInformationProps {
   generalInformation:GeneralInformationData
}


export function GeneralInformationView({ generalInformation}:GeneralInformationProps ) {
   
   return (
         <div className=" flex-grow grid grid-cols-2  gap-2 lg:grid-cols-4  ">
	    
	 <div className="row-start-1 " >
	   <LabelView value={generalInformation.name} name="Nombres"/>
	   <LabelView value={generalInformation.lastName} name="Apellidos"/>
	 </div>
	 <div>
	 </div>

	 <div className="row-start-2">
	     
	   <LabelView value={generalInformation.typeIdentification} name="Tipo de identificacion"/>
	 </div>
	 <div className="row-start-2">
	   <LabelView value={generalInformation.identification} name="identificacion"/>
	 </div>
	 <div className="row-start-3">
           
	   <LabelView value={generalInformation.expeditionDate} name="Fecha de expedicion"/>
	 </div>
	 <div className="row-start-3">
           
	   <LabelView value={generalInformation.expeditionCity} name="Ciudad de expedicion"/>
	 </div>
	 
	<div className="row-start-4">
           
	   <LabelView value={generalInformation.birthDate} name="Fecha de nacimiento"/>

	 </div>
	 <div className="row-start-4">
	    
	   <LabelView value={generalInformation.countryBirth} name="Pais"/>
	 </div>

	 <div className="row-start-4">
	    
	   <LabelView value={generalInformation.stateBirth} name="Estado"/>
	 </div>
	  <div className="row-start-4">
	    
	   <LabelView value={generalInformation.cityBirth} name="Ciudad"/>
	 </div>
	 <div className="row-start-5">
	   <LabelView value={generalInformation.gender} name="Genero"/>
	 </div>
	 <div className="row-start-5">

	   <LabelView value={generalInformation.statusCivil} name="Estado civil"/>
            
	 </div>

	 <div className="row-start-6">
           
	   <LabelView value={generalInformation.addressResidence} name="Direccion de residencia"/>
	 </div>

	 <div className="row-start-6">
	  
	   <LabelView value={generalInformation.countryResidence} name="Pais"/>
	 </div>

	 <div className="row-start-6">
	   
	   <LabelView value={generalInformation.stateResidence} name="Estado"/>
	 </div>
	  <div className="row-start-6">
	   
	   <LabelView value={generalInformation.cityResidence} name="Ciudad"/>
	 </div>

 
	 <div className="row-start-7">
	   <LabelView value={generalInformation.email} name="Correo"/>
	 </div>
	 <div className="row-start-7">
	   <LabelView value={generalInformation.phone} name="Telefono"/>
	 </div>
	 <div className="row-start-7">
	   <LabelView value={generalInformation.landLine} name="Telefono fijo"/>
	 </div>
	 
	
	 <div className="row-start-[8]">
	   <LabelView value={generalInformation.housingType} name="Tipo de vivienda"/>
	 </div>

	 <div className="row-start-[8]">
	   <LabelView value={generalInformation.studies} name="Estudios"/>
	 </div>

	 
	 <div className="row-start-[8]">
	   <LabelView value={generalInformation.profession} name="Profesion"/>
	 </div>
	 <div className="row-start-[9]">
	 </div>
	 <div className="row-start-[9]">
            
	 </div>
	 <div className="row-start-[9]">
           
	 </div>
	 <div className="row-start-[9]">
            
	 </div>

         </div>
   );
}

export default GeneralInformationView;

