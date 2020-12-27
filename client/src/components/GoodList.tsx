import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IGoodListProps, IGoodListState } from "../appInterfaces";
import { GoodRequestContext } from "../pages/Main";
import GoodInList from './GoodInList';
import PageLoader from "./Loader";

export default function GoodList({ title, quantity, sale }: IGoodListProps): JSX.Element {
  const [loading, setLoading] = useState(true);
  const { goodListState, setGoodListState, isFilter, setIsFilter } = useContext(GoodRequestContext);
  const loadableTitle = useLocation().pathname.match(/(?:\/categories\/)+(?:[/]?[^]+\/)*?([^/]+$)/);
  
  let reqParams = `quantity=${quantity ? quantity : goodListState.quantity}`;
  reqParams += sale ? '&sale=' + sale : ''; 
  reqParams += goodListState.category ? '&category=' + goodListState.category : '';
  reqParams += goodListState.male ? '&male=' + goodListState.male : '';
  reqParams += goodListState.country ? '&country=' + goodListState.country : '';
  reqParams += goodListState.price.from ? '&priceFrom=' + goodListState.price.from : '';
  reqParams += goodListState.price.by ? '&priceBy=' + goodListState.price.by : '';
  reqParams += goodListState.sale ? '&sale=' + goodListState.sale : '';
  reqParams += goodListState.searchValue ? '&search=' + goodListState.searchValue : '';
  useEffect(() => {
    fetch(`/get-goods?${reqParams}`)
      .then(response => response.json())
      .then(result => {
        setGoodListState((prev: IGoodListState) => {
          return {...prev, goods: result}
        });
        setLoading(false);
        setIsFilter(false);
      })
      .catch(e => setLoading(false));
  }, [goodListState.category, goodListState.searchValue, isFilter, reqParams, setGoodListState, setIsFilter]);
  

  return (
    <>
      <h1>{ title || loadableTitle![1] || ' ' }</h1>
      <div className="resize">
      {loading 
        ? <PageLoader />
        : (goodListState.goods.length 
          ? goodListState.goods.map((good: any) => {
            return <GoodInList good={good} key={good._id} />
          })
          : <p>{'По вашему запросу товаров не найдено.'}</p>
        )
      }
      </div>
    </>
  );
}