import { IGoodListState } from 'company-app';

export default function createRequestQuery(quantity: string | undefined, sale: boolean | undefined, goodListState: IGoodListState): string {
  let reqParams = `quantity=${quantity ? quantity : goodListState.quantity}`;
  reqParams += sale ? '&sale=' + sale : ''; 
  reqParams += goodListState.category ? '&category=' + goodListState.category : '';
  reqParams += goodListState.male ? '&male=' + goodListState.male : '';
  reqParams += goodListState.country ? '&country=' + goodListState.country : '';
  reqParams += goodListState.price.from ? '&priceFrom=' + goodListState.price.from : '';
  reqParams += goodListState.price.by ? '&priceBy=' + goodListState.price.by : '';
  reqParams += goodListState.sale ? '&sale=' + goodListState.sale : '';
  reqParams += goodListState.searchValue ? '&search=' + goodListState.searchValue : '';
  reqParams += goodListState.page ? '&page=' + goodListState.page : '';
  return reqParams;
}