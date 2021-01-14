import SidebarCategories from './SidebarCategories';
import SidebaFilter from './filter/SidebarFilter';
import useToggleHide from '../hooks/useToggleHide';

export default function Sidebar(): JSX.Element {
  const [ hidden, setHidden ] = useToggleHide();
 
  return (
    <aside className={`sidebar ${hidden ? '' : 'hidden'}`}>
      <span onClick={setHidden} className="hide-sidebar"></span>
      <h3 className="sidebar-title">Каталог</h3>
      <SidebarCategories title="Выбрать категорию" />
      <SidebaFilter />
    </aside>
  );
}