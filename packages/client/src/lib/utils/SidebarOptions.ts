      
export enum Background {
      main="bg-[#0C745B]",
      parametrization="bg-[#123C63]",
      wallet="bg-[#956302]", 
      accounting="bg-[#631212]"
}


export enum MenuSidebar {
   main="main",
   parametrization="parametrization",
   wallet="wallet",
   accounting="accounting"

}


export enum  LogoModules {
   main="/logoMain.svg",
   parametrization="/logoParametrization.svg",
   wallet="/logoWallet.svg",
   accounting="/logoAccounting.svg"
}
export const SideBarModules = [
   {
      name:'Parametrizacion',
      href:"/parametrization",
      icon:"/parametrization.svg",
      background:Background.parametrization,
      menu:MenuSidebar.parametrization,
      iconModule:LogoModules.parametrization
   },
   {
      name:'Cartera ,aportes, depositos y ahorros',
      href:"/wallet",
      background:Background.wallet, 
      icon:"/wallet.svg",
      menu:MenuSidebar.wallet,
      iconModule:LogoModules.wallet
   },
   {
      name:'Contabilidad',
      href:"/accounting",
      background:Background.accounting, 
      icon:"/accounting.svg",
      menu:MenuSidebar.accounting,
      iconModule:LogoModules.accounting
   },


]



