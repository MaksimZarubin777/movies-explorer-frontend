import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

function SavedMovies({
  handleSearch,
  likedMovies,
  isLoaded,
  onDelete,
  handleSubmitSaved,
  setIsCheckBoxActive,
  setLikedMovies,
  setFilteredLikedMovies,
}) {
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
          handleMovieDelete={onDelete}
          setLikedMovies={setLikedMovies}
          setFilteredLikedMovies={setFilteredLikedMovies}
      />
      ) : null}
    </>
  );
}

export default SavedMovies;
