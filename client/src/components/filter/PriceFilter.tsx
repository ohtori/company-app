import { BaseSyntheticEvent, useContext, useState } from 'react';
import { IGoodListState } from 'company-app';
import { GoodRequestContext } from '../../pages/Main';

export default function SidebaFilter(): JSX.Element {
  const [priceState, setPriceState] = useState({ from: '0', by: '0' });
  const { setGoodListState } = useContext(GoodRequestContext);
  
  const inputHandler = (e: BaseSyntheticEvent) => {
    if (!e.target.value.match(/^[0-9]*$/) || e.target.value.length > 6) {      
      return e.preventDefault();  
    };
    setPriceState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    });
    setGoodListState((prev: IGoodListState) => {
      return { ...prev, price: { ...prev.price, [e.target.name]: e.target.value }, searchValue: '', page: 1};
    });
  }

  return (
    <div className="price-filter">
      <h4 className="price-filter-title">Цена:</h4>
      <div>
        <label htmlFor="from">От: </label>
        <input  
          className="price-filter-input"
          type="text"
          name="from"
          id="from"
          onInput={inputHandler}
          value={priceState.from}
        />
      </div>
      <div>
        <label htmlFor="to">До: </label>
        <input
          className="price-filter-input"
          type="text"
          name="by"
          id="to"
          onInput={inputHandler}
          value={priceState.by}
        />
      </div>
  </div>
  )
}