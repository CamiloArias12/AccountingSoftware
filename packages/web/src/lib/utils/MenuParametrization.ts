
const route:string= "/dashboard/parametrization/"

export enum  LogoModuleParametrization {
   thirds="/thirds.svg",
   typeAccounts="/typeaccount.svg",
   typeSavings="/savings.svg",
   typeCredits="/typecredit.svg"
}
export const ParametrizationSideBar = [
   {
      name:'Terceros',
      href:`${route}thirds`,
      icon:LogoModuleParametrization.thirds,
   },{
      name:'Cuentas',
      href:`${route}typeaccount`,
      icon:LogoModuleParametrization.typeAccounts,
   },{
      name:'Tipos de ahorro',
      href:`${route}typesaving`,
      icon:LogoModuleParametrization.typeSavings,
   },{
      name:'Tipos de credito',
      href:`${route}typecredit`,
      icon:LogoModuleParametrization.typeCredits,
   }
]

