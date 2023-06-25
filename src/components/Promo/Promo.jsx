import { Link } from 'react-router-dom';
import './Promo.css';
import planeta from '../../images/landing-logo.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <img className='promo__img' src={planeta} alt=''/>
        <div className='promo__text-block'>
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <Link to='/' className="promo__link">Узнать больше</Link>
        </div>
      </div>
    </section>
  );
}

export default Promo;
