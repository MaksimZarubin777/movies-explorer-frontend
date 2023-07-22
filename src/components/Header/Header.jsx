import Navigation from '../Navigation/Navigation.jsx';
import './Header.css';

function Header({ isLoggedIn }) {
  return (
    <header className={isLoggedIn ? 'header header__loggedIn' : 'header header__loggedOut'}>
      <Navigation isLoggedIn={isLoggedIn}/>
    </header>
  );
}

export default Header;
