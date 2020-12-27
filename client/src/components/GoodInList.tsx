import { IGoodInList } from "../appInterfaces";


export default function GooInList({good}: IGoodInList): JSX.Element {
  return (
    <>
      <div className="good-item">
        <a href={`goods/${good._id}`} className="good-image-wrap">
          <img src={`/images${good.imgURL}`} alt={good.title} />
        </a>
        <a href={`goods/${good._id}`} className="good-title">{good.title}</a>
        <div className="price-section">
          <p className="price">{good.price}<span className="currency">₽</span></p>
          {good.sale ? <p className="sale">Sale -{good.sale}%</p> : null}
        </div>
        <div className="add-to-card">
          <button className="add-to-card-btn">Добавить в корзину</button>
        </div>
      </div>
    </>
  );
}