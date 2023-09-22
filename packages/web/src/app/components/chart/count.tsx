
function CountChart({title,value,background}:{title:string,value:number,background:string}){

   return (
     <div className={` p-4 mx-2 flex-grow flex flex-row rounded-lg ${background}`}>
	 <div className="flex-grow">
	    <img className="h-10 w-10" src="/thirds.svg" />
	 </div>
	 <div className="flex flex-col">
	     <label className="text-sm text-white">{title}</label>
	     <label  className="text-white">{value}</label>
	 </div>
     </div>

   );

}

export default CountChart
