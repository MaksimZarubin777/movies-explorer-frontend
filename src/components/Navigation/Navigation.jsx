import { useContext } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import BurgerMenuContext from '../../context/BurgerMenuContext.jsx';
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx';

function Navigation() {
  const currentPath = window.location.pathname;
  const { isBurgerMenuOpen, toggleBurgerMenu } = useContext(BurgerMenuContext);

  return (
    <div className='navigation'>
      <Link to='/' className='header__logo' alt='Логотип'/>
      {/* СЕЙЧАС ИЗМЕНЕНИЕ ХЕДЕРА В ЗАВИСИМОСТИ ОТ currentPath,
      НА ЭТАПЕ АПИ НУЖНО ИЗМЕНИТЬ ЛОГИКУ */}
      {currentPath !== '/' ? (
        <>
        <div className='navigation__container navigation__container_loggedIn'>
          <div className='navigation__films'>
            <Link to='/movies' className='navigation__text'>Фильмы</Link>
            <Link to='/saved-movies' className='navigation__text'>Сохраненные фильмы</Link>
          </div>
            <Link to='/profile' className='navigation__profile' />
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
