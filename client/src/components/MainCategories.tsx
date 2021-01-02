import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IGoodListState } from 'company-app';
import { GoodRequestContext } from '../pages/Main';

export default function MainCategories(): JSX.Element {
  const { setGoodListState } = useContext(GoodRequestContext);

  const setGoodListCategory = (category: string) => {
    setGoodListState((prev: IGoodListState) => {
      return {...prev, category}
    });
  }

  return (
    <section className="main-categories">
      <Link 
        onClick={() => setGoodListCategory('5fe8491ea645f01bec12efff')} 
        to={`/categories/Куртки`} 
        className="category-item"
      >
        <p className="category-item-inner">
          <span>Куртки</span>
        </p>
      </Link>
      <Link 
        onClick={() => setGoodListCategory('5fe84920a645f01bec12f059')} 
        to={`/categories/Футболкии`}
        className="category-item"
      >
        <p className="category-item-inner">
          <span>Футболкии</span>
        </p>
      </Link>
      <Link 
        onClick={() => setGoodListCategory('5fe84920a645f01bec12f04c')} 
        to={`/categories/Джемперы`} 
        className="category-item"
      >
        <p className="category-item-inner">
          <span>Джемперы</span>
        </p>
      </Link>
      <Link 
        onClick={() => setGoodListCategory('5fe84920a645f01bec12f066')} 
        to={`/categories/Платья`} 
        className="category-item"
      >
        <p className="category-item-inner">
          <span>Платья</span>
        </p>
      </Link>
      <Link 
        onClick={() => setGoodListCategory('5fe84920a645f01bec12f06d')} 
        to={`/categories/Юбки`} 
        className="category-item"
      >
        <p className="category-item-inner">
          <span>Юбки</span>
        </p>
      </Link>
      <Link 
        onClick={() => setGoodListCategory('5fe84920a645f01bec12f074')} 
        to={`/categories/Толстовки`} 
        className="category-item"
      >
        <p className="category-item-inner">
          <span>Толстовки</span>
        </p>
      </Link>
    </section>
  );
}