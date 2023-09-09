export function AddSvg({color}:{color:string}){
    return (
      <svg width="15px" height="15px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
	    <path stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 25V7M7 16h18"/>
      </svg>

    )     

}
