import { useEffect, useState } from 'react';
import './MoviesCard.css';
import MainApi from '../../utils/MainApi';
import { BASE_URL, MINUTES_PER_HOUR } from '../../vendor/constants';

function MoviesCard({
  film,
  savedMovies,
  likedMovies,
  handleMovieDelete,
  setLikedMovies,
}) {
  const currentPath = window.location.pathname;
  const [isLikeClicked, setIsLikeClicked] = useState(false);

  const handleClick = () => {
    if (film.trailerLink) {
      window.open(film.trailerLink, '_blank'); // Открываем ссылку в новом окне
    }
  };

  // функция проверки лайкнут ли уже фильм
  const checkIsFilmLiked = () => {
    const isFilmLiked = likedMovies && likedMovies
      .some((likedFilm) => likedFilm.movieId === film.id);

    const localLikedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    const isFilmLikedInLocalStorage = localLikedMovies.some((likedFilm) => likedFilm.movieId === film.id);  

    if (isFilmLiked || isFilmLikedInLocalStorage) {
      setIsLikeClicked(true);
    } else {
      setIsLikeClicked(false);
    }
  };

  // хук вызова функции проверки лайкнут ли уже фильм
  useEffect(() => {
    if (currentPath !== '/saved-movies') {
      checkIsFilmLiked();
    }
  }, [likedMovies]);

  // функция удаления лайка
  const filmLikeDelete = () => {
    MainApi.deleteMovie(film._id)
      .then((film) => {
        const localLikedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
        const updatedLikedMovies = localLikedMovies.filter((movie) => movie.movieId !== film._id);
        console.log('updated', updatedLikedMovies);
        localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
      })
      console.log('eto spisok posle delete', JSON.parse(localStorage.getItem('likedMovies')));
  };

  // функция конвертации минут в часы
  const convertMinutesToHours = (minutes) => {
    if (minutes < MINUTES_PER_HOUR) {
      return `${minutes}мин`;
    }

    const hours = Math.floor(minutes / MINUTES_PER_HOUR);
    const remainingMinutes = minutes % MINUTES_PER_HOUR;

    if (hours === 0) {
      return `${remainingMinutes} мин`;
    }
    return `${hours}ч ${remainingMinutes} мин`;
  };

  // функция лайка/дизлайка
  const handleIsLiked = () => {
    setIsLikeClicked(!isLikeClicked);
    const {
      country,
      director,
      duration,
      year,
      description,
      image: { url },
      trailerLink,
      image: { formats: { thumbnail: { url: thumbnailUrl } } },
      id,
      nameRU,
      nameEN,
    } = film;
    const filmToLike = likedMovies && likedMovies
      .find((movie) => movie.movieId === id);
    if (!filmToLike) {
      MainApi.saveMovie({
        country,
        director,
        duration,
        year,
        description,
        image: BASE_URL + url,
        trailerLink,
        thumbnail: BASE_URL + thumbnailUrl,
        movieId: id,
        nameRU,
        nameEN,
      })
        .then((movie) => {
          const localLikedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
          localLikedMovies.push(movie.data);
          localStorage.setItem('likedMovies', JSON.stringify(localLikedMovies));
          console.log('eto spisok posle layka', JSON.parse(localStorage.getItem('likedMovies')));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (filmToLike) {
      MainApi.deleteMovie(filmToLike._id)
        .then(() => {
          const localLikedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
          const updatedLikedMovies = localLikedMovies.filter((movie) => movie.movieId !== id);
          localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
          console.log('eto spisok posle dislayka', JSON.parse(localStorage.getItem('likedMovies')));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='movies-card'>
        <img src={currentPath === '/saved-movies' ? film.image : BASE_URL + film.image.url} alt='' className='movies-card__img' onClick={handleClick}></img>
        <h3 className='movies-card__title'>{film.nameRU}</h3>
        {currentPath === '/saved-movies' ? (
          <span className='movies-card__delete' onClick={filmLikeDelete}/>
        ) : (
          <span className={isLikeClicked ? 'movies-card__like movies-card__like_on' : 'movies-card__like movies-card__like_off'} onClick={handleIsLiked}/>
        )}
        <p className='movies-card__duration'>{convertMinutesToHours(film.duration)}</p>
    </div>
  );
}

export default MoviesCard;
