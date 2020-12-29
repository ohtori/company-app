import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BasketContext } from "../../pages/Main";

export default function HeadBasket() {
  const { basketState, setBasketState } = useContext(BasketContext);

  useEffect(() => {
    const goodsInBasket = JSON.parse(localStorage.getItem('basket')!);
    if (goodsInBasket !== null) {
      setBasketState(goodsInBasket);
    }
  }, [setBasketState]);

  return (
    <Link to="/basket" className="head-basket-wrap">
      <span className="head-basket-count">{ basketState.length }</span>
    </Link>
  );
}