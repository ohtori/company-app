import { useContext, useState } from "react";
import { IGood } from "../../appInterfaces";
import { BasketContext } from "../../pages/Main";
import BasketGood from "./BasketGood";

export default function Basket(): JSX.Element {
  const { basketState, setBasketState } = useContext(BasketContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ basketGoods, setBasketGoods ] = useState([]);
  console.log(basketGoods);
  
  
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
        {/* <form action="/" method="POST" className="basket-form">
          <h2>Контактные данные:</h2>
          <div>
            <input type="text" name="name" placeholder="Ваше имя" className="basket-form-field" />
          </div>
          <div>
            <input type="text" name="phone" placeholder="Ваш телефон" className="basket-form-field" />
          </div>
          <div>
            <input type="text" name="email" placeholder="Ваш e-mail" className="basket-form-field" />
          </div>
          <button className="basket-form-send">Оформить заказ</button>
        </form> */}
      </div>
    </>
  );
}