import React, { useState } from 'react';

type SelectFieldProps = {
    name: string;
    label: string;
    value: string;
    options: any;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    children?: React.ReactNode
};

function SelectFieldTest ({options}:{options:any} ) {
      const [toggle,setToggle]=useState<boolean>(false)
      const [name,setName]=useState<String>("Colombia")
      const [img,setImg]=useState<String>("CO")

    return (
        <div className="relative">
            <label className="text-xs">Pais</label>
	    <button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
	       onClick={() => {setToggle(!toggle) }
	       }	  
	    >
	       <span>
		  <img className="inline mr-2 h-4 rounded-sm"
			src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${img}.svg`} />
		 {name} 
	       </span>
	    </button>
	       <ul className=" absolute z-10 mt-1 bg-white shadow-lg max-h-100 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
		  <div className=" max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll">
		  {toggle &&
		     options.map((option:any) =>(
			   <li className="text-gray-900 cursor-default select-none relative py-3  flex items-center hover:bg-gray-50 transition" 
				 onClick={() =>{ setToggle(!toggle); setName(option.name); setImg(option.iso2)}}>
			      <img className="h-5 text-gray-900 cursor-default select-none relative px-2 flex items-center hover:bg-gray-50 transition"
				 src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${option.iso2}.svg`}
			      />
			      <span className="font-normal truncate">{option.name}</span>
			   </li>
		     	))
	       }
	       </div>
	    </ul>
        </div>
    );
};

export default SelectFieldTest
