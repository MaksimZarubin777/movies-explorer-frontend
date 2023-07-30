import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

function SavedMovies({
  handleSearch,
  // likedMovies,
  isLoaded,
  onDelete,
  handleSubmitSaved,
  setIsCheckBoxActive,
  isLikedSearchPerformed,
}) {
  console.log(likedMovies);
  const [likedMovies, setLikedMovies] = useState([]);
  
  useEffect(() => {
    if(isLikedSearchPerformed) {
      const storedLikedMovies = JSON.parse(localStorage.getItem('filteredLikedMovies'));
    } else {
      const storedLikedMovies = JSON.parse(localStorage.getItem('likedMovies'));
    }
    if (storedLikedMovies) {
      setLikedMovies(storedLikedMovies);
    }
  }, []);

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
