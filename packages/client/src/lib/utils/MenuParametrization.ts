
const route:string= "/dashboard/parametrization/"

export enum  LogoModuleParametrization {
   thirds="/thirds.svg",
   accounts="/typeaccount.svg",
   savings="/savings.svg",
   credits="/typecredit.svg"
}
export const ParametrizationSideBar = [
   {
      name:'Terceros',
      href:`${route}thirds`,
      icon:LogoModuleParametrization.thirds,
   },{
      name:'Cuentas',
      href:`${route}typeaccount`,
      icon:LogoModuleParametrization.accounts,
   },{
      name:'Tipos de ahorro',
      href:`${route}typesaving`,
      icon:LogoModuleParametrization.savings,
   },{
      name:'Tipos de credito',
      href:`${route}typecredit`,
      icon:LogoModuleParametrization.credits,
   }
]

