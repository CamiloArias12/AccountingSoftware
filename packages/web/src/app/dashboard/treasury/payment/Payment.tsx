"use client"
import TableCreditsPayment from "@/app/components/forms/credit/TableCreditPayment";
import Button from "@/app/components/input/Button";
import InputCalendar from "@/app/components/input/Calendar";
import { gql,useMutation,} from "@apollo/client";
import { useState } from "react";

const PAYMENT_CREDIT =gql `
mutation ($date:Date!){
   getAllInstallments(date:$date){
    installmentNumber
    credit
    paymentDate
    scheduledPayment
    interest
    finalBalance
    identification
    name
    lastName
    typeCredit
    extraPayment
    totalPayment
    capital
    interestPayment
    idTypeCredit
    isSelected
  }
  
}

`


function Payment (){

   const [installmentPayment, { data:creditData, loading: creditLoading, error: creditError}] = useMutation(PAYMENT_CREDIT);
  

   const  [date,setDate]=useState({
      date:new Date(),
      startDate:new Date()
   })

   console.log(date)
   const handleGetInstallmentPaymnet =() =>{
	installmentPayment({
	    variables :{
	      date:date.date 
	    }
	})  
   }
  const handleDate= (name:string,value:Date) => {
        setDate(prevData => ({ ...prevData, [name]: value }));
   };
 
   return (
      <div className="bg-white flex flex-col h-full w-full">
	 <div className="flex flex-row m-4 "> 
	    <div className="mr-6">
	       <InputCalendar name="date" label="Fecha"  value={date.date} onChange={handleDate}/>
	    </div>
	    <div>
	       <InputCalendar name="date" label="Fecha"  value={date.startDate} onChange={handleDate}/>
	    </div>
	    <div className="flex items-end mx-10 ">
	       <Button name="Aceptar" onClick={() =>{handleGetInstallmentPaymnet()}} background="bg-[#10417B] text-white"/>
	    </div>
	 </div>
	 {creditData &&
	    <TableCreditsPayment  installmentPayment={creditData.getAllInstallments}  dateStart={date.startDate}/>
	 }
      </div>

   )

}

export default Payment
