import { useContext } from 'react';
import './BurgerMenu.css';
import { Link } from 'react-router-dom';
import BurgerMenuContext from '../../context/BurgerMenuContext.jsx';

function BurgerMenu() {
  const { isBurgerMenuOpen, toggleBurgerMenu } = useContext(BurgerMenuContext);

  return (
    <div className={isBurgerMenuOpen ? 'burger-menu' : ''}>
      <div className='burger-menu__container'>
        <span className='burger-menu__close-button' onClick={toggleBurgerMenu}></span>
        <div className='burger-menu__links'>
          <Link to='/' className='burger-menu__link' onClick={toggleBurgerMenu}>Главная</Link>
          <Link to='/movies' className='burger-menu__link' onClick={toggleBurgerMenu}>Фильмы</Link>
          <Link to='/saved-movies' className='burger-menu__link' onClick={toggleBurgerMenu}>Сохраненные фильмы</Link>
        </div>
        <Link to='/profile' className='burger-menu__profile' />
      </div>
    </div>
  );
}

export default BurgerMenu;
