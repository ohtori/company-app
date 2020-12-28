import { BaseSyntheticEvent, useContext, useState } from 'react';
import { IGoodListState, ISelectProps } from '../../appInterfaces';
import { GoodRequestContext } from '../../pages/Main';

export default function SidebarSelect({ title, stateProperty, options }: ISelectProps): JSX.Element {
  const { setGoodListState } = useContext(GoodRequestContext);
  const [active, setActive] = useState(false);
  const [selectTitle, setSelectTitle] = useState('Не выбрано');  
  
  const toggleSelect = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setActive(!active);
  }

  const selectHandler = (e: BaseSyntheticEvent, option: string) => {    
    e.preventDefault();
    setTimeout(setGoodListState((prev: IGoodListState) => {
      return {...prev, [stateProperty]: option, searchValue: ''}
    }), 1000)
    if (option) {
      setSelectTitle(option);
    } else {
      setSelectTitle('Любой(ая)');
    }
    setActive(!active);
  }

  return (
    <div className={`select ${active ? 'active' : ''}`}>
      <h4>{ title }:</h4>
      <a href="/" onClick={toggleSelect} className="select-btn">{ selectTitle }<span className="select-btn-arrow"></span></a>
      <ul className="select-list">
        { options.map((option: string) => {
          return <li key={ option }><a href="/" onClick={e => {selectHandler(e, option)}}>{ option }</a></li>
        }) }
        <li key={ 'lyuboy' }><a href="/" onClick={e => {selectHandler(e, '')}}>{'Любой(ая)'}</a></li>
      </ul>
    </div>
  )
}