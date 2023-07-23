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
        <div className='burger-menu__links' onClick={toggleBurgerMenu}>
          <Link to='/' className='burger-menu__link'>Главная</Link>
          <Link to='/movies' className='burger-menu__link'>Фильмы</Link>
          <Link to='/saved-movies' className='burger-menu__link'>Сохраненные фильмы</Link>
        </div>
        <div className='burger-menu__profile' onClick={toggleBurgerMenu}>
          <Link to='/profile'/>
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;
