interface ButtonProps {
   name:string
   background:string
   onClick?:any

}


function Button ({name,background,onClick}:ButtonProps) {
      return (
	 <button  className={` ${background}  px-5 py-2  rounded-lg hover:shadow-lg  `} onClick={onClick} >{name}</button> 

      );
}


export default Button
