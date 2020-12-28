import { BaseSyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ICategory, IGoodListState, ISidebarCategories } from '../appInterfaces';
import { GoodRequestContext } from '../pages/Main';
import PageLoader from './Loader';

export default function SidebarCategories({ title }: ISidebarCategories): JSX.Element {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);
  const { setGoodListState } = useContext(GoodRequestContext);

  const toggleSelect = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setActive(!active);
  }

  const setGoodListCategory = (category: string) => {
    setGoodListState((prev: IGoodListState) => {
      return {...prev, category, searchValue: '', page: 1}
    });
  }

  useEffect(() => {
    fetch('/get-categories')
    .then(response => response.json())
    .then(result => {
      setCategories(result);
      setLoading(false);
    })
    .catch(e => setLoading(false));
  }, []);

  return (
    <div className={`select ${active ? 'active' : ''}`}>
      <a href="/" onClick={toggleSelect} className="select-btn">{title}<span className="select-btn-arrow"></span></a>
      <ul className="select-list">
        {loading 
          ? <PageLoader />
          : (categories.length 
            ? categories.map((category: ICategory) => {              
              return (
                <li key={category._id}>
                  <Link onClick={() => setGoodListCategory(category._id)} to={`/categories/${category.title}`}>{category.title}</Link>
                </li>
              );
            })
            : <p className="select-error">Ошибка, попробуйте позже :(</p>
          )
        }
      </ul>
    </div>
  );
}