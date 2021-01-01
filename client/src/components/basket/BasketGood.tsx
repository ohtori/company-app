import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBasketGood, IBasketGoodProps, IGood } from "../../appInterfaces";
import { BasketContext } from "../../pages/Main";

export default function BasketGood({ good, setTotalPrice, setBasketGoods }: IBasketGoodProps, ): JSX.Element {
  const { basketState, setBasketState } = useContext(BasketContext);
  const [amount, setAmount] = useState(1);
  
  const inputHandler = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const newAmount = e.target.value;
    if (!newAmount.match(/^[0-9]+$/) && (newAmount !== '')) return;

    if ((newAmount > 999) || (amount < 0)) return;

    let different = newAmount - amount;

    setAmount(newAmount);
    setTotalPrice((prev: number) => prev + (different * good.price));
    setBasketGoods((prev: IBasketGood[]) => {
      const newGoods = prev.filter(elem => elem.title !== good.title);
      return [...newGoods, {title: good.title, amount: newAmount}]
    });
  }

  const deleteHandler = () => {
    setAmount(0);
    setTotalPrice((prev: number) => prev - (amount * good.price));
    setBasketGoods((prev: []) => {
      const newArr = prev.filter((elem: IBasketGood) => elem.title !== good.title);
      return newArr;
    });
    setBasketState((prev: IGood[]) => {
      const newArr = prev.filter(elem => elem._id !== good._id);
      return newArr;
    });
  }

  useEffect(() => {
    setTotalPrice((prev: number) => prev + (amount * good.price));
    setBasketGoods((prev: []) => [...prev, {title: good.title, amount: amount, price: good.price}]);
    localStorage.setItem('basket', JSON.stringify(basketState));
  }, []);

  return (
    <div className="basket-item">
      <Link to={`/goods/${good._id}`} className="basket-item-title">{ good.title }</Link>
      <input 
        className="basket-item-input"
        type="number"
        name="amount"
        value={ amount }
        onInput={inputHandler}
      />
      <p className="price">{ good.price }<span className="currency">₽</span></p>
      <span onClick={deleteHandler} className="basket-item-delete"></span>
    </div>
  );
}