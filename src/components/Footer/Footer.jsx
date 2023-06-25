import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__info'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__links-block'>
      <p className='footer__text footer__year'>©2023</p>
        <div className='footer__links'>
          <Link to='https://practicum.yandex.ru' target="_blank" className='footer__text'>Яндекс.Практикум</Link>
          <Link to='https://github.com' target="_blank" className='footer__text'>Github</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
