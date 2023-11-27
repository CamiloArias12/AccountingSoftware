import { TypeAccounnt } from '../type-account/types';

export type TypeSaving = {
  id: number;
  name: string;
  auxiliarys: Auxiliary[];
};

export type Auxiliary = {
  typeAccount: TypeAccounnt;
};


export type TypeSavingAcounts ={
   account:any
   percentage:any
   nature:any
};
