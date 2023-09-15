      
export enum Background {
      main="border-l-[#0C745B]",
      parametrization="border-l-[#3C7AC2]",
      wallet="border-l-[#956302]", 
      accounting="border-l-[#631212]"
}


export enum MenuSidebar {
   main="main",
   parametrization="parametrization",
   wallet="wallet",
   accounting="accounting"

}


export enum  LogoModules {
   main="/logo.svg",
   parametrization="/logoParametrization.svg",
   wallet="/logoWallet.svg",
   accounting="/logoAccounting.svg"
}
export const SideBarModules = [
   {
      name:'Inicio',
      href:"/dashboard",
      icon:"/home.svg",
      background:Background.main,
      menu:MenuSidebar.main,
      iconModule:LogoModules.main,
   },

   {
      name:'Parametrizacion',
      href:"/dashboard/parametrization",
      icon:"/parametrization.svg",
      background:Background.parametrization,
      menu:MenuSidebar.parametrization,
      iconModule:LogoModules.parametrization,
   },
   {
      name:'Cartera ,aportes',
      href:"wallet",
      background:Background.wallet, 
      icon:"/wallet.svg",
      menu:MenuSidebar.wallet,
      iconModule:LogoModules.wallet,
   },
   {
      name:'Contabilidad',
      href:"accounting",
      background:Background.accounting, 
      icon:"/accounting.svg",
      menu:MenuSidebar.accounting,
      iconModule:LogoModules.accounting,
   },


]



