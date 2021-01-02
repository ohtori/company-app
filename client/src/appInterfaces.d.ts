declare module 'company-app' {
  //Authorization interfaces
  export { IAuth, IAuthErrors, IUser, IAuthContext } from './interfaces/authInterfaces';
  //DB interfaces
  export { IGood, ICategory, IUser, IAuthContext } from './interfaces/dbInterfaces';
  //Props interfaces
  export { 
    IGoodInList,
    ISidebarCategories,
    IGoodListProps,
    ISelectProps,
    ICheckboxProps,
    IBasketGoodProps,
    IBasketFormProps 
  } from './interfaces/propsInterfaces';
  //Context interfaces
  export { IGoodListContext, IBasketContext } from './interfaces/contextInterfaces';
  //State interfaces
  export { IGoodListState, IBasketFormState, IBasketGood } from './interfaces/stateInterfaces';
}