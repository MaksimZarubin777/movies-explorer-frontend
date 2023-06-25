import Navigation from '../Navigation/Navigation.jsx';
import './Header.css';

function Header() {
  const currentPath = window.location.pathname;
  return (
    <header className={currentPath === '/' ? 'header header__loggedOut' : 'header header__loggedIn'}>
      <Navigation />
    </header>
  );
}

export default Header;
