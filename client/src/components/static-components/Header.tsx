import { Link } from 'react-router-dom';

export default function Header (): JSX.Element {
  return (
  <header className="header">
    <div className="resize">
      <Link to="/" className="logo">
        Company Entertainment
      </Link>
      <div className="header-contacts">
        <a href="tel:+79641847970" className="header-tel">+ 7 (964) 184-79-70</a>
        <a href="mailto:example@gmail.ru" className="header-mail">example@gmail.ru</a>
      </div>
    </div>
  </header>
)
}