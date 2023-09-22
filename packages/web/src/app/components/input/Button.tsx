function Button ({name,background}:{name:string,background:string}) {
      return (
	 <button  className={` ${background}  px-5 py-2  rounded-lg hover:shadow-lg  `} >{name}</button> 

      );
}


export default Button
