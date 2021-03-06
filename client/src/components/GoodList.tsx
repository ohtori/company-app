import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { IGoodListProps, IGoodListState } from 'company-app';
import createRequestQuery from '../helpers/createRequestQuery';
import setCategory from '../helpers/setCategory';
import { GoodRequestContext } from "../pages/Main";
import GoodInList from './GoodInList';
import PageLoader from './Loader';

export default function GoodList({ title, quantity, sale }: IGoodListProps): JSX.Element {
  const [loading, setLoading] = useState(true);
  const { goodListState, setGoodListState, isFilter, setIsFilter } = useContext(GoodRequestContext);
  const loadableTitle = useRouteMatch().params as { category: string};
  const path = useLocation().pathname;
  const prevPath = useRef(path);

  if (path !== prevPath.current) {
    setCategory(loadableTitle.category, setGoodListState);
    prevPath.current = path;
  }  
  
  if (!goodListState.category && loadableTitle.category) {
    setCategory(loadableTitle.category, setGoodListState);
  }

  if (goodListState.searchValue) {
    title += ` "${goodListState.searchValue}"`;
  }

  let reqParams = createRequestQuery(quantity, sale, goodListState);

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
  }, [goodListState.category, goodListState.searchValue, goodListState.page, isFilter, setGoodListState, setIsFilter]);

  

  return (
    <>
      <h1>{ title || loadableTitle.category || ' ' }</h1>
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