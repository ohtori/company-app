import { createContext, useState } from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/static-components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/static-components/Footer';
import Searsh from '../components/Search';
import HeadBasket from '../components/basket/HeadBascet';
import MainCategories from '../components/MainCategories';
import GoodList from '../components/GoodList';
import Basket from '../components/basket/Basket';
import { IBasketContext, IGood, IGoodListContext } from '../appInterfaces';
import Pagination from '../components/Pagination';
import Good from '../components/Good';
import '../assets/css/style.css';

export const GoodRequestContext = createContext({} as IGoodListContext);
export const BasketContext = createContext({} as IBasketContext);

export default function Main(): JSX.Element {
  const [isFilter, setIsFilter] = useState(false);
  const [basketState, setBasketState] = useState<IGood[]>([]);
  const [goodListState, setGoodListState] = useState({
    category: '',
    quantity: '21',
    page: 1, 
    isFilter: false,
    male: '',
    country: '',
    price: {
      from: '0',
      by: '0'
    },
    sale: false,
    searchValue: '',
    goods: []
  });
 
  return (
    <>
      <Header />
      <main className="main">
        <div className="resize">
          <GoodRequestContext.Provider value={{ 
            goodListState, 
            setGoodListState,
            isFilter,
            setIsFilter
          }}>
            <BasketContext.Provider value={{ basketState, setBasketState }}>
              <Sidebar />
              <div className="content-wrap">
                <section className="content-head">
                  <Searsh />
                  <HeadBasket />
                </section>
                <Route exact path="/">
                  <MainCategories />
                  <section className="content">
                    {/* <CustomGoodList title="Акции и скидки" params="quantity=6&sale=true" /> */}
                    <GoodList title="Акции и скидки" quantity="6" sale={true} />
                  </section>
                </Route>
                <Route path="/categories/:category">
                  <section className="content">
                    <GoodList />
                    <Pagination />
                  </section>
                </Route>
                <Route path="/goods/:goodID">
                  <section className="content">
                    <Good />
                  </section>
                </Route>
                <Route path="/search">
                  <section className="content">
                    <GoodList title="Результаты поиска по запросу" />
                    <Pagination />
                  </section>
                </Route>
                <Route path="/basket">
                  <section className="content">
                    <Basket />
                  </section>
                </Route>
              </div>
            </BasketContext.Provider>
          </GoodRequestContext.Provider>
        </div>
      </main>
    <Footer />
  </>
  )
}