import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import './MoviesCardList.css';
import {
  GAP_EXTRA_SMALL,
  GAP_LARGE,
  GAP_MEDIUM,
  GAP_SMALL,
  MAX_FILM_AMOUNT_EXTRA_SMALL,
  MAX_FILM_AMOUNT_LARGE,
  MAX_FILM_AMOUNT_MEDIUM,
  MAX_FILM_AMOUNT_SMALL,
  SCREEN_SIZE_LARGE,
  SCREEN_SIZE_MEDIUM,
  SCREEN_SIZE_SMALL,
} from '../../vendor/constants';

function MoviesCardList({
  films,
  isError,
  isSearchPerformed,
  savedMovies,
  likedMovies,
  setLikedMovies,
  setFilteredLikedMovies,
}) {
  // установаливаем windowWidth изначально равным размеру окна
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // устанавливаем количество отображаемых фильмов
  const [filmAmount, setFilmAmount] = useState(0);
  // устанавливаем количество оставшихся фильмов после отрисовки
  const [filmsRemain, setFilmsRemain] = useState(0);
  // определяем массив с фиьмами для отрисовки
  const [displayedFilms, setDisplayedFilms] = useState([]);
  // устанавливаем шаг добавления новых фильмов в зависимости от размера окна
  const [gap, setGap] = useState(0);
  const currentPath = window.location.pathname;

  // при изменении размера окна устанавливаем windowWidth равным размеру окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // отслеживаем изменения windowWidth и устанавливаем filmAmount
  useEffect(() => {
    if (windowWidth >= SCREEN_SIZE_LARGE) {
      setFilmAmount(MAX_FILM_AMOUNT_LARGE);
      setGap(GAP_LARGE);
    } else if (windowWidth >= SCREEN_SIZE_MEDIUM) {
      setFilmAmount(MAX_FILM_AMOUNT_MEDIUM);
      setGap(GAP_MEDIUM);
    } else if (windowWidth >= SCREEN_SIZE_SMALL) {
      setFilmAmount(MAX_FILM_AMOUNT_SMALL);
      setGap(GAP_SMALL);
    } else if (windowWidth < SCREEN_SIZE_SMALL) {
      setFilmAmount(MAX_FILM_AMOUNT_EXTRA_SMALL);
      setGap(GAP_EXTRA_SMALL);
    }
  }, [windowWidth]);

  // устанавливаем необходимое кол-во карточек для отрисовки в зависимости от размера окна браузера
  // и количество оставшихся неотрисованными карточек
  useEffect(() => {
    setDisplayedFilms(films && films.length > 0 ? films.slice(0, filmAmount) : []);
    setFilmsRemain(films && films.length > 0 ? films.length - filmAmount : 0);
  }, [films, filmAmount]);

  const handleShowMore = () => {
    const newFilmAmount = filmAmount + gap;
    setFilmAmount(newFilmAmount);
    setDisplayedFilms(films && films.length > 0 ? films.slice(0, newFilmAmount) : []);
    setFilmsRemain(films && films.length > 0 ? films.length - newFilmAmount : 0);
  };

  return (
    <section className="movies-card-list">
      <div className='movies-card-list__container'>
        {isError && (
          <p>
            Во время запроса произошла ошибка.
            Возможно, проблема с соединением или сервер недоступен.
            Подождите немного и попробуйте ещё раз.
          </p>
        )}

        {!isError && (displayedFilms.length > 0 ? (
          displayedFilms.map((film) => <MoviesCard
            key={film.id}
            film={film}
            savedMovies={savedMovies}
            likedMovies={likedMovies}
            setLikedMovies={setLikedMovies}
            setFilteredLikedMovies={setFilteredLikedMovies}
            isSearchPerformed={isSearchPerformed}
          />)
        ) : (
          isSearchPerformed && currentPath !== '/saved-movies' && (<p>Ничего не найдено</p>)
        ))}
      </div>
      {isSearchPerformed && filmsRemain > 0 && (
        <button className='movies-card-list__button' onClick={handleShowMore}>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;
