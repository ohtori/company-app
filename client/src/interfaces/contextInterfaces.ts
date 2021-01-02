import { IGoodListState, IGood } from "company-app";

export interface IGoodListContext {
  goodListState: IGoodListState
  setGoodListState: Function
  isFilter: boolean
  setIsFilter: Function
}

export interface IBasketContext {
  basketState: IGood[]
  setBasketState: Function
}