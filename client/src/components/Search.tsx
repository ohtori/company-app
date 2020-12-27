import { BaseSyntheticEvent, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { IGoodListState } from "../appInterfaces";
import { GoodRequestContext } from "../pages/Main";

export default function Searsh(): JSX.Element {
  const [ search, setSearch ] = useState('');
  const { setGoodListState } = useContext(GoodRequestContext);
  const history = useHistory();

  const inputHandler = (e: BaseSyntheticEvent) => {
    if (e.target.value.length > 300) {
      return e.preventDefault();
    }
    setSearch(e.target.value);
  }

  const submitHandler = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    history.push('/search');
    setGoodListState((prev: IGoodListState) => {
      return {
        category: '',
        quantity: '21',
        page: '1', 
        male: '',
        country: '',
        price: {
          from: '0',
          by: '0'
        },
        sale: false,
        searchValue: search,
        goods: []
      };
    });
  }
  

  return (
    <form onSubmit={submitHandler} className="head-search-form" method="POST" action="#">
      <input
        onInput={inputHandler}
        placeholder="Введите наименование товара"
        className="search-input" type="text" name="search"
      />
      <button className="search-btn"></button>
    </form>
  );
}