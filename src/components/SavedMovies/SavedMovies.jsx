import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import MainApi from '../../utils/MainApi';

function SavedMovies({
  handleSearch,
  likedMovies,
  isLoaded,
  onDelete,
  handleSubmitSaved,
  setIsCheckBoxActive,
}) {
  console.log(likedMovies);

  // Создаем стейт для хранения актуальных данных фильмов с лайками
  const [actualLikedMovies, setActualLikedMovies] = useState(likedMovies);

  // Хук, который будет обновлять actualLikedMovies при изменении likedMovies
  useEffect(() => {
    setActualLikedMovies(likedMovies);
  }, [likedMovies]);

  // функция удаления лайка
  const handleMovieDelete = (movieId) => {
    MainApi.deleteMovie(movieId)
      .then(() => {
        // Обновляем массив likedMovies после удаления фильма
        const updatedLikedMovies = likedMovies.filter((movie) => movie.movieId !== movieId);
        setActualLikedMovies(updatedLikedMovies);

        // Также обновляем локальное хранилище с фильмами
        localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SearchForm
        handleSubmit={handleSearch}
        handleSubmitSaved={handleSubmitSaved}
        setIsCheckBoxActive={setIsCheckBoxActive}
      />
      {isLoaded ? (
        <MoviesCardList
          films={actualLikedMovies} // Используем актуальные данные из стейта
          handleMovieDelete={handleMovieDelete} // Передаем обновленную функцию удаления
        />
      ) : null}
    </>
  );
}

export default SavedMovies;
