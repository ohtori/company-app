import { useContext, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { IGood } from "../appInterfaces";
import { BasketContext } from "../pages/Main";
import PageLoader from "./Loader";

export default function Good(): JSX.Element {
  const { setBasketState } = useContext(BasketContext);
  const params = useRouteMatch().params as { goodID: string };
  const [good, setGood] = useState({} as IGood);
  const [loading, setLoading] = useState(true);  

  const addHandler = (good: IGood) => {
    setBasketState((prev: IGood[]) => [...prev, good]);
  }  
  
  useEffect(() => {
    fetch(`/good?id=${params.goodID}`)
      .then(response => response.json())
      .then(result => {        
        setGood((result));
        setLoading(false);
      })
      .catch(e => setLoading(false));
  }, []);
  
  return (
    <>
      { loading 
        ? <PageLoader />
        : <div className="good">
            <h1>{ good.title }</h1>
            <div className="good-img">
              <img src={`/images${good.imgURL}`} alt={good.title} />
            </div>
            <div className="good-info">
              <div className="good-price-wrap">
                <p className="price">{ good.price }<span className="currency">₽</span></p>
                {good.sale ? <p className="sale">Sale -{good.sale}%</p> : null}
              </div>
              <div className="add-to-card">
                <button onClick={() => addHandler(good)} className="add-to-card-btn">Добавить в корзину</button>
              </div>
              <div className="good-fields-wrap">
              <div className="good-field">
                  <strong>Пол:</strong> <span>{ good.gender }</span>
                </div>
                <div className="good-field">
                  <strong>Страна:</strong> <span>{ good.country }</span>
                </div>
              </div>
              <div className="good-desc">
                <h2>Описание:</h2>
                { good.desc }
              </div>
            </div>
          </div>
      }
    </>
  );
}