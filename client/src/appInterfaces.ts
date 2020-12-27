//Authorization
export interface IAuth {
  email: string
  password: string
}

export interface IAuthErrors {
  emailError: string
  passwordError: string
  serverError: string
}

//Global Authorization
export interface IUser {
  token: string
  role: string
}

export interface IAuthContext {
  token: string
  role: string
  login: (user: IUser) => void
  logout: () => void
}

//Goods and Categories
export interface IGood {
  _id: string
  title: string
  gender: string
  country: string
  desc: string
  category: object
  imgURL: string
  price: number
  sale: number,
  operation: string
}

export interface ICategory {
  [x: string]: any;
  _id: string
  title: string
  desc: string
  good_list: any[]
}

export interface IUser {
  email: string
  password: string
  role: string
}

//Props types
export interface IGoodInList {
  good: IGood
};

export interface ISidebarCategories {
  title: string
};

export interface IGoodListParams {
  goodListState: IGoodListState
  setGoodListState: Function
  isFilter: boolean
  setIsFilter: Function
};

export interface IGoodListProps {
  title?: string,
  quantity?: string,
  sale?: boolean
}

export interface ISelectProps {
  title: string
  stateProperty: string
  options: string[]
}

export interface ICheckboxProps {
  title: string
  label: string
  stateProperty: string
}

export interface IGoodListState {
  category: string, 
  page: string, 
  male: string,
  country: string,
  quantity: string,
  price: {
    from: string,
    by: string
  },
  sale: boolean,
  searchValue: string,
  goods: any[]
}