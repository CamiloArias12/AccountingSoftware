
const route:string= "/dashboard/treasury/"

export enum  LogoTreasury{
   payments="/payment.svg",
   interest="/interest.svg"
}
export const TreasurySideBar = [
    {
      name:'Pagos',
      href:`${route}payment`,
      icon:LogoTreasury.payments,
    },
   {
      name:'Diferido intereses',
      href:`${route}interest`,
      icon:LogoTreasury.interest,
    }

]

