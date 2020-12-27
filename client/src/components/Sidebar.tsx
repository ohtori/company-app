import SidebarCategories from './SidebarCategories';
import SidebaFilter from './filter/SidebarFilter';

export default function Sidebar(): JSX.Element {
  return (
    <aside className="sidebar">
      <span className="hide-sidebar"></span>
      <h3 className="sidebar-title">Каталог</h3>
      <SidebarCategories title="Выбрать категорию" />
      <SidebaFilter />
    </aside>
  );
}