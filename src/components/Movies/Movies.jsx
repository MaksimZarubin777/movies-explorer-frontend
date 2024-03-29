import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import Preloader from '../Preloader/Preloader.jsx';

function Movies({
  handleSearch,
  isLoading,
  films,
  isSearchPerformed,
  isError,
  setIsCheckBoxActive,
  likedMovies,
  isLoaded,
  savedMovies,
  isCheckBoxActive,
}) {
  return (
    <>
      <SearchForm
        handleSubmit={handleSearch}
        setIsCheckBoxActive={setIsCheckBoxActive}
        isCheckBoxActive={isCheckBoxActive}
      />
      {isLoading ? (<Preloader />) : null}
      {!isLoading && isLoaded ? (
        <MoviesCardList
          films={films}
          isError={isError}
          isSearchPerformed={isSearchPerformed}
          savedMovies={savedMovies}
          likedMovies={likedMovies}
      />) : null}
    </>
  );
}

export default Movies;
