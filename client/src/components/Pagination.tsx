import { BaseSyntheticEvent, useCallback, useContext, useEffect, useState } from 'react';
import { IGoodListState } from 'company-app';
import createRequestQuery from '../helpers/createRequestQuery';
import { GoodRequestContext } from '../pages/Main';

export default function Pagination(): JSX.Element | null {
  const [pages, setPages] = useState<JSX.Element[]>([]);
  const { goodListState, setGoodListState } = useContext(GoodRequestContext);
  let reqParams = createRequestQuery('Some String', false, goodListState);
  reqParams += '&pagination=true';  

  const clickHandler = useCallback((e: React.MouseEvent<HTMLElement>, operation: string, value?: number) => {
    e.preventDefault();
    switch (operation) {
      case 'min':
        return setGoodListState((prev: IGoodListState) => {
          return {...prev, page: 1};
        });
      case 'max':
        return setGoodListState((prev: IGoodListState) => {
          return {...prev, page: pages.length};
        });
      case 'increment':
        if (goodListState.page >= pages.length) return;
        return setGoodListState((prev: IGoodListState) => {
          return {...prev, page: prev.page + 1};
        });
      case 'decrement':
        if (goodListState.page <= 1) return;
        return setGoodListState((prev: IGoodListState) => {
          return {...prev, page: prev.page - 1};
        });
      case 'set':
        if (goodListState.page === value || !value) return;        
        return setGoodListState((prev: IGoodListState) => {
          return {...prev, page: value};
        });
      default:
        break;
    }
  }, [goodListState.page, pages.length, setGoodListState])
  
  useEffect(() => {
    fetch(`/get-goods?${reqParams}`)
      .then(response => response.json())
      .then(result => {
        const pageCount = Math.ceil(result / +goodListState.quantity);
        const fetchedPages = [];
        for (let i = 0; i < pageCount; i++) {
          if (i + 1 === goodListState.page) {
            fetchedPages.push(<li className="active" onClick={(e) => clickHandler(e, 'set', i + 1)} key={i}><a href="/">{ i + 1 }</a></li>);
            continue;
          } else {
            fetchedPages.push(<li onClick={(e) => clickHandler(e, 'set', i + 1)} key={i}><a href="/">{ i + 1 }</a></li>);
          }
        }        
        setPages(fetchedPages);
      })
      .catch(e => console.log(e.message));
  }, [goodListState, clickHandler, reqParams]);
  
  return (
    pages.length > 1 
    ? <ul className="pagination">
        <li><a href="/" onClick={(e) => clickHandler(e, 'min')}>{'<<'}</a></li>
        <li><a href="/" onClick={(e) => clickHandler(e, 'decrement')}>{'<'}</a></li>
        {pages}
        <li><a href="/" onClick={(e) => clickHandler(e, 'increment')}>{'>'}</a></li>
        <li><a href="/" onClick={(e) => clickHandler(e, 'max')}>{'>>'}</a></li>
      </ul>
    : null
  );
}