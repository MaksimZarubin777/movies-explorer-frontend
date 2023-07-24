import { useEffect, useState } from 'react';
import './MoviesCard.css';
import MainApi from '../../utils/MainApi';

function MoviesCard({
  film,
  savedMovies,
  likedMovies,
  handleMovieDelete,
  setLikedMovies,
}) {
  const currentPath = window.location.pathname;
  const BASE_URL = 'https://api.nomoreparties.co';
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [likedMoviesData, setLikedMoviesData] = useState(likedMovies);

  const handleClick = () => {
    if (film.trailerLink) {
      window.open(film.trailerLink, '_blank'); 
    }
  };

  // функция проверки лайкнут ли уже фильм
  const checkIsFilmLiked = () => {
    const localMovies = JSON.parse(localStorage.getItem('localSavedMovies'));
    const isFilmLiked = (likedMoviesData ? likedMoviesData : localMovies) && (likedMoviesData ? likedMoviesData : localMovies)
      .some((likedFilm) => likedFilm.movieId === film.id);
    if (isFilmLiked) {
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
  }, [likedMoviesData, currentPath]);

  // функция удаления лайка
  const filmLikeDelete = () => {
    handleMovieDelete(film._id);
  };

  // функция конвертации минут в часы
  const convertMinutesToHours = (minutes) => {
    if (minutes < 60) {
      return `${minutes}мин`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes}мин`;
    }
    return `${hours}ч ${remainingMinutes}мин`;
  };
  console.log(likedMoviesData);
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
    const filmToLike = likedMoviesData && likedMoviesData
      .find((movie) => movie.movieId === id);
    if (!filmToLike) {
      console.log('bylo');
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
        .then((data) => {
          setLikedMoviesData([...likedMoviesData, data.data]);
          localStorage.setItem('localSavedMovies', JSON.stringify(likedMoviesData));
          setIsLikeClicked(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (filmToLike) {
      console.log('nebylo');
      MainApi.deleteMovie(filmToLike._id)
        .then(() => {
          setLikedMoviesData(likedMoviesData.filter((movie) => movie.movieId !== id));
          localStorage.setItem('localSavedMovies', JSON.stringify(likedMoviesData));
          setIsLikeClicked(false);
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
