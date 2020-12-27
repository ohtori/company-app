import { BaseSyntheticEvent, useContext, useState } from "react";
import { ICheckboxProps, IGoodListState } from "../../appInterfaces";
import { GoodRequestContext } from "../../pages/Main";

export default function SidebarCheckbox({ title, stateProperty, label }: ICheckboxProps ): JSX.Element {
  const [active, setActive] = useState(false);
  const { setGoodListState } = useContext(GoodRequestContext);

  const toggleCheckbox = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setActive(!active);
    setGoodListState((prev: IGoodListState) => {
      return { ...prev, [stateProperty]: !prev.sale, searchValue: '' };
    });
  }
  
  return (
    <div className="checkbox">
      <h4 className="price-filter-title">{ title }</h4>
      <label htmlFor="from">{ label }</label>
      <a href="/" onClick={toggleCheckbox} className={`checkbox-input ${active ? 'active' : ''}`}>
        <span className="checkbox-input-inner"></span>
      </a>
    </div>
  )
}