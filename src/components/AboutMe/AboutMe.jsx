import { Link } from 'react-router-dom';
import './AboutMe.css';
import photo from '../../images/photo.png';
import arrow from '../../images/arrow.svg';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='section__title'>Студент</h2>
        <div className='about-me__info'>
          <div>
            <h2 className='about-me__info_name'>Виталий</h2>
            <h3 className='about-me__info_major'>Фронтенд-разработчик, 30 лет</h3>
            <p className='about-me__info_description'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
              С 2015 года работал в компании «СКБ Контур».
              После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами
              и ушёл с постоянной работы.
            </p>
            <div className='about-me__info_links'>
              <Link to='https://github.com' target="_blank" className='about-me__info_links'>Github</Link>
            </div>
          </div>
          <img className='about-me__info_photo' src={photo} alt='mypic'/>
        </div>

        <div className='about-me__portfolio'>
          <p className='about-me__portfolio_title'>Портфолио</p>
            <Link to='https://github.com/MaksimZarubin777/how-to-learn' target='_blank' className='about-me__portfolio_element'>
              <p className='about-me__portfolio_element_title'>Статичный сайт</p>
              <img src={arrow} alt='link' />
            </Link>
            <Link to='https://github.com/MaksimZarubin777/russian-travel' target='_blank' className='about-me__portfolio_element'>
              <p className='about-me__portfolio_element_title'>Адаптивный сайт</p>
              <img src={arrow} alt='link' />
            </Link>
            <Link to='https://github.com/MaksimZarubin777/react-mesto-api-full-gha' target='_blank' className='about-me__portfolio_element'>
              <p className='about-me__portfolio_element_title'>Одностраничное приложение</p>
              <img src={arrow} alt='link' />
            </Link>
        </div>
    </section>
  );
}

export default AboutMe;
