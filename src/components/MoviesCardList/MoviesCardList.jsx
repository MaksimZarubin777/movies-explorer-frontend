import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import './MoviesCardList.css';

function MoviesCardList({
  films,
  isError,
  isSearchPerformed,
  savedMovies,
  likedMovies,
  handleMovieDelete,
  setLikedMovies,
  isLikeClicked,
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
    if (windowWidth >= 1280) {
      setFilmAmount(12);
      setGap(4);
    } else if (windowWidth >= 990) {
      setFilmAmount(12);
      setGap(3);
    } else if (windowWidth >= 768) {
      setFilmAmount(8);
      setGap(2);
    } else if (windowWidth < 768) {
      setFilmAmount(5);
      setGap(2);
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
            handleMovieDelete={handleMovieDelete}
            setLikedMovies={setLikedMovies}
            isLikeClicked={isLikeClicked}
          />)
        ) : (
          isSearchPerformed && <p>Ничего не найдено</p>
        ))}
      </div>
      {isSearchPerformed && filmsRemain > 0 && (
        <button className='movies-card-list__button' onClick={handleShowMore}>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;
