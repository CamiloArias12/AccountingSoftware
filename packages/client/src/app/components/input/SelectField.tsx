import React, { useState } from 'react';

type SelectFieldProps = {
    name: string;
    label: string;
    value: string;
    options: { id: number, name: string }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    children?: React.ReactNode
};

function SelectField ({ name, label, value, options, onChange,children }:SelectFieldProps) {
      const [toggle,setToggle]=useState<boolean>(false)
    return (
      <>
            <label className="text-xs pb-2">{label}</label>
	    <button className="bg-white relative w-full border border-gray-300 rounded-sm shadow-sm pl-3 pr-10 py-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
	       onClick={() => {setToggle(!toggle) }
	       }	  
	    >
	       <span>
		 {value} 
	       </span>
	    </button>
	       <ul className=" absolute z-10 mt-1 bg-white shadow-lg max-h-100 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
		  <div className=" max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll">
		  {toggle &&
		     options.map((option:any) =>(
			   <li className="text-gray-900 cursor-default select-none relative py-3  flex items-center hover:bg-gray-50 transition" 
				 onClick={() =>{ setToggle(!toggle); value=option.name; }}>
			      <span className="font-normal truncate">{option.name}</span>
			   </li>
		     	))
	       }
	       </div>
	    </ul>
        </>

    );
};

export default SelectField;
