import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

function SavedMovies({
  handleSearch,
  likedMovies,
  isLoaded,
  handleSubmitSaved,
  setIsCheckBoxActive,
  setLikedMovies,
  setFilteredLikedMovies,
  isSearchPerformed,
}) {
  console.log('11', likedMovies);
  return (
    <>
      <SearchForm
      handleSubmit={handleSearch}
      handleSubmitSaved={handleSubmitSaved}
      setIsCheckBoxActive={setIsCheckBoxActive}
    />
      {isLoaded ? (
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
