import { useContext } from 'react';
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import BurgerMenuContext from '../../context/BurgerMenuContext.jsx';
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx';

function Navigation({ isLoggedIn }) {
  const { isBurgerMenuOpen, toggleBurgerMenu } = useContext(BurgerMenuContext);

  return (
    <div className='navigation'>
      <Link to='/' className='header__logo' alt='Логотип'/>
      {isLoggedIn ? (
        <>
        <div className='navigation__container navigation__container_loggedIn'>
          <div className='navigation__films'>
            <NavLink to='/movies' className='navigation__text' activeClassName='navigation__text_active'>Фильмы</NavLink>
            <NavLink to='/saved-movies' className='navigation__text' activeClassName='navigation__text_active'>Сохраненные фильмы</NavLink>
          </div>
            <Link to='/profile' className='navigation__profile'/>
        </div>
        <button className='navigation__burger-menu' onClick={toggleBurgerMenu}></button>
        {isBurgerMenuOpen && <BurgerMenu />}
        </>
      ) : (
        <div className='navigation__container'>
          <div className='navigation__links'>
            <Link to='/signup' className='navigation__auth'>Регистрация</Link>
            <Link to='/signin' className='navigation__auth'>Войти</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
