import { IGoodListState } from "../appInterfaces";
import { initialGoodListState } from '../pages/Main';

export default function goodListReducer(state: IGoodListState, action: {type: string, payload: any}) {
  switch(action.type) {
    case 'SET_CATEGORY': {
      return { ...state, category: action.payload, searchValue: '', page: 1 };
    }
    case 'SET_GOODS': {
      return { ...state, goods: action.payload };
    }
    case 'SET_PAGE': {
      return { ...state, page: action.payload };
    }
    case 'SET_SEARCH': {
      return { ...initialGoodListState, searchValue: action.payload };
    }
    case 'SET_MALE': {
      return {...state, male: action.payload, searchValue: '', page: 1};
    }
    case 'SET_COUNTRY': {
      return {...state, country: action.payload, searchValue: '', page: 1};
    }
    case 'SET_SALE': {
      return { ...state, sale: !state.sale, searchValue: '', page: 1 };
    }
    case 'SET_PRICE_FROM': {
      return { ...state, price: { ...state.price, from: action.payload }, searchValue: '', page: 1};
    }
    case 'SET_PRICE_TO': {
      return { ...state, price: { ...state.price, to: action.payload }, searchValue: '', page: 1};
    }
    case 'SET_QUANTITY': {
      return {...state, quantity: action.payload};
    }
    default: return state;
  }
}