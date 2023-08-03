import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Preloader from '../Preloader/Preloader.jsx';

function SavedMovies({
  handleSearch,
  likedMovies,
  isLoaded,
  isLoading,
  handleSubmitSaved,
  setIsCheckBoxActive,
  setLikedMovies,
  setFilteredLikedMovies,
  isSearchPerformed,
  setIsCheckBoxActiveOnSavedMovies,
  setSavedMoviesSearchedValue,
}) {
  return (
    <>
      <SearchForm
        handleSubmit={handleSearch}
        handleSubmitSaved={handleSubmitSaved}
        setIsCheckBoxActive={setIsCheckBoxActive}
        setIsCheckBoxActiveOnSavedMovies={setIsCheckBoxActiveOnSavedMovies}
        setSavedMoviesSearchedValue={setSavedMoviesSearchedValue}
      />
      {isLoading ? (<Preloader />) : null}
      {!isLoading && isLoaded ? (
        <MoviesCardList
          films={likedMovies}
          setLikedMovies={setLikedMovies}
          setFilteredLikedMovies={setFilteredLikedMovies}
          isSearchPerformed={isSearchPerformed}
      />
      ) : null}
    </>
  );
}

export default SavedMovies;
