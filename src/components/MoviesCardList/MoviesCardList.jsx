import films from '../../utils/constants';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import './MoviesCardList.css';

function MoviesCardList() {
  const currentPath = window.location.pathname;

  return (
    <section className="movies-card-list">
      <div className='movies-card-list__container'>
      {currentPath === '/saved-movies' ? (
        films.filter((film) => film.liked === true)
          .map((likedFilm) => <MoviesCard film={likedFilm} />)
      ) : (
        films.map((film) => <MoviesCard film={film} />)
      )}
      </div>
      <button className='movies-card-list__button'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;
