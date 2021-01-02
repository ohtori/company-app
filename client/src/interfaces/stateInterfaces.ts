export interface IGoodListState {
  category: string, 
  page: number, 
  isFilter: boolean
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
  [x: string]: any
}

export interface IBasketFormState {
  name: string
  phone: string
  email: string
}

export interface IBasketGood {
  title: string
  amount: number
}