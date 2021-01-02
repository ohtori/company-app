import { useContext } from 'react';
import SidebarSelect from './SidebarSelect';
import PriceFilter from './PriceFilter';
import SidebaCheckbox from './SidebarCheckbox';
import { GoodRequestContext } from '../../pages/Main';

export default function SidebaFilter(): JSX.Element {
  const { setIsFilter } = useContext(GoodRequestContext);

  const sendHandler = () => {
    setIsFilter(true);
  }

  return (
    <>
      <h3 className="sidebar-title">Фильтр</h3>
      <SidebarSelect title="Пол" stateProperty="male" options={['Женский', 'Мужской']} />
      <SidebarSelect title="Страна" stateProperty="country" options={['Вьетнам', 'Китай', 'Россия']} />
      <PriceFilter />
      <SidebaCheckbox  stateProperty="sale" title="Товар со скидкой:" label="Скидка %" />
      <div className="send-wrap">
        <button onClick={sendHandler} className="send-btn">Применить</button>
      </div>
    </>
  )
}