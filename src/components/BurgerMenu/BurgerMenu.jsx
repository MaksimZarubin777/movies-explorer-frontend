import { useContext } from 'react';
import './BurgerMenu.css';
import { Link, useNavigate } from 'react-router-dom';
import BurgerMenuContext from '../../context/BurgerMenuContext.jsx';

function BurgerMenu() {
  const { isBurgerMenuOpen, toggleBurgerMenu } = useContext(BurgerMenuContext);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    toggleBurgerMenu();
    navigate('/profile', { relace: true });
  }
  return (
    <div className={isBurgerMenuOpen ? 'burger-menu' : ''}>
      <div className='burger-menu__container'>
        <span className='burger-menu__close-button' onClick={toggleBurgerMenu}></span>
        <div className='burger-menu__links' onClick={toggleBurgerMenu}>
          <Link to='/' className='burger-menu__link'>Главная</Link>
          <Link to='/movies' className='burger-menu__link'>Фильмы</Link>
          <Link to='/saved-movies' className='burger-menu__link'>Сохраненные фильмы</Link>
        </div>
        <span to='/profile' className='burger-menu__profile' onClick={handleProfileClick}></span>
      </div>
    </div>
  );
}

export default BurgerMenu;
