

type CheckBoxThirdsProps ={
      isChecked:boolean
      onChange:any
      name:string
}

function CheckBoxThirds ({isChecked,onChange,name}:CheckBoxThirdsProps) {
   return (
      <>      
	  <div className="flex flex-row items-center pl-4">
	    <div className={`h-5 w-5  rounded-[50%] border-2 border-[#10417B] ${isChecked ? "bg-[#10417B]" : "bg-white"}`} onClick={onChange }/>
            <label htmlFor={name} className="pl-3 text-sm">
                {name}
            </label>
        </div>

      </>
   )
}


export default CheckBoxThirds
