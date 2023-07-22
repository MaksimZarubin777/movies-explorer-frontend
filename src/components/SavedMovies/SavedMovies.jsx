import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

function SavedMovies({
  handleSearch,
  likedMovies,
  isLoaded,
  onDelete,
  handleSubmitSaved,
  setIsCheckBoxActive,
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
      />
      ) : null}
    </>
  );
}

export default SavedMovies;
