interface ButtonProps {
   name:string
   background:string
   onClick?:any

}


function Button ({name,background,onClick}:ButtonProps) {
      return (
	 <button  className={` ${background} text-input font-bold px-6 py-2  rounded-sm hover:shadow-lg  `} onClick={onClick} >{name}</button> 

      );
}


export default Button
