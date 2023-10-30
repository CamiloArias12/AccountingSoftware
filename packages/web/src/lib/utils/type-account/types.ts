export type TypeAccounnt = {
  code: number;
  name: string;
  nature?: string;
  state?: boolean;
};

export type GeneralTypeAccount = {
  typeAccount: TypeAccounnt;
  type: string;
  accounts: GeneralTypeAccount[];
};
