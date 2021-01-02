import { IGood, IBasketGood } from 'company-app';

export interface IGoodInList {
  good: IGood
}

export interface ISidebarCategories {
  title: string
}

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

export interface IBasketGoodProps {
  good: IGood
  setTotalPrice: Function
  setBasketGoods: Function
  basketGoods: IBasketGood[]
}

export interface IBasketFormProps {
  basketGoods: IBasketGood[]
  totalPrice: number,
  setBasketGoods: Function
}