import { createContext, useState } from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Searsh from '../components/Search';
import HeadBasket from '../components/HeadBascet';
import MainCategories from '../components/MainCategories';
import GoodList from '../components/GoodList';
import { IGoodListParams } from '../appInterfaces';
import '../assets/css/style.css';
import Pagination from '../components/Pagination';

export const GoodRequestContext = createContext({} as IGoodListParams);

export default function Main(): JSX.Element {
  const [isFilter, setIsFilter] = useState(false);
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
  console.log(goodListState);
  
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
              <Route path="/categories">
                <section className="content">
                  <GoodList />
                  <Pagination />
                </section>
              </Route>
              <Route path="/search">
                <section className="content">
                  <GoodList title="Результаты поиска по запросу" />
                  <Pagination />
                </section>
              </Route>
            </div>
          </GoodRequestContext.Provider>
        </div>
      </main>
    <Footer />
  </>
  )
}