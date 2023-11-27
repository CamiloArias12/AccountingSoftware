
export type MovementInfo ={
   id: number;
   value:number
   date:Date
   concept:string
   accounting: string;
   state:boolean

}


export type Movement ={
   id:string
   movement:MovementInfo

}


export type MovementAccount ={
     
   credit: number
     
   debit: string
     
   identification: number
     
   identificationThird: number
     
   nameThird:string
     
   code: number
     
   nameAccount: string
     
 }
