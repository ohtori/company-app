import { useContext, useState } from "react";
import { IGood } from "../../appInterfaces";
import { BasketContext } from "../../pages/Main";
import BasketForm from "./BasketForm";
import BasketGood from "./BasketGood";

export default function Basket(): JSX.Element {
  const { basketState } = useContext(BasketContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ basketGoods, setBasketGoods ] = useState([]);  
  
  return (
    <>
      <h1>Корзина</h1>
      <div className="basket-wrap">
        <div className="basket">
          {basketState.length 
            ? basketState.map((good: IGood) => {
              return(
                <BasketGood 
                  setTotalPrice={setTotalPrice} 
                  setBasketGoods={setBasketGoods}
                  basketGoods={basketGoods}
                  good={good}
                  key={good._id}
                />
              );
            })
            : <p>В козине пока нет товаров</p>
          }
        </div>
        <div className="basket-total">
          <p className="basket-total-finaly">Итого:</p>
          <div className="basket-total-price">{ totalPrice }<span className="currency">₽</span></div>
        </div>
        <BasketForm setBasketGoods={setBasketGoods} basketGoods={basketGoods} totalPrice={totalPrice} />
      </div>
    </>
  );
}