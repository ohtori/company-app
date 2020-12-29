import { BaseSyntheticEvent, useEffect, useState } from "react";
import { IBasketGood, IBasketGoodProps } from "../../appInterfaces";

export default function BasketGood({ good, setTotalPrice, basketGoods, setBasketGoods }: IBasketGoodProps, ): JSX.Element {
  //const { basketState, setBasketState } = useContext(BasketContext);
  const [amount, setAmount] = useState(1);
  
  const inputHandler = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const newAmount = e.target.value;
    if (!newAmount.match(/^[0-9]+$/) && (newAmount !== '') || (newAmount > 999) || (amount < 0))  {
      return;
    }

    let different = newAmount - amount;

    setAmount(newAmount);
    setTotalPrice((prev: number) => prev + (different * good.price));
    setBasketGoods((prev: IBasketGood[]) => {
      const newGoods = prev.filter(elem => elem.title !== good.title);
      return [...newGoods, {title: good.title, amount: newAmount}]
    });
  }

  useEffect(() => {
    setTotalPrice((prev: number) => prev + (amount * good.price));
    setBasketGoods((prev: []) => [...prev, {title: good.title, amount: amount}]);
  }, []);

  return (
    <div className="basket-item">
      <a href="/" className="basket-item-title">{ good.title }</a>
      <input 
        className="basket-item-input"
        type="number"
        name="amount"
        value={ amount }
        onInput={inputHandler}
      />
      <p className="price">{ good.price }<span className="currency">₽</span></p>
      <a href="/" className="basket-item-delete"> </a>
    </div>
  );
}