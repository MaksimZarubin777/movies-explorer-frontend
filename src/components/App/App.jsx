import './App.css';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { BurgerMenuProvider } from '../../context/BurgerMenuContext.jsx';
import CurrentUserContext from '../../context/CurrentUserContext.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.jsx';
import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import Popup from '../Popup/Popup.jsx';

function App() {
  // стейт записи логина
  const [loggedIn, setLoggedIn] = useState(false);

  // стейты записи ожидания поиска и загрузки фильмов с сервера
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);

  // стейты всех фильмов с сервера, отфильтрованных, лайкнутых
  const [films, setFilms] = useState();
  const [filteredFilms, setFilteredFilms] = useState();
  const [likedMovies, setLikedMovies] = useState([]);
  const [filteredLikedMovies, setFilteredLikedMovies] = useState([]);

  // стейты состояний
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [isError, setisError] = useState(false);
  const [isLikedSearchPerformed, setIsLikedSearchPerformed] = useState(false);
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const searchValue = localStorage.getItem('searchValue');
  const navigate = useNavigate();
  const location = useLocation();

  // этой функцией проверяет достпен ли еще jwt и если нет, удаляем локалсторедж и loggedIn
  const getContent = () => {
    MainApi.getUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        navigate('/', { replace: true });
      });
  };

  useEffect(() => {
    getContent();
  }, []);
  console.log(loggedIn);

  // функция получения фильмов с лайком
  const getLikedMovies = () => {
    MainApi.getFilms()
      .then((data) => {
        setLikedMovies(data.data);
        localStorage.setItem('likedMovies', JSON.stringify(data));
        setisLoaded(true);
      });
  };

  // функция получения данных пользователя
  const getUserInformation = () => {
    MainApi.getUser()
      .then((user) => {
        setCurrentUser(user);
      });
  };

  // хук вызова функция полчения данных если пользователь залогинен
  useEffect(() => {
    if (loggedIn) {
      getUserInformation();
      getLikedMovies();
    }
  }, [loggedIn]);

  // функция удаления лайка
  const handleMovieDelete = (movieId) => {
    MainApi.deleteMovie(movieId)
      .then(() => {
        getLikedMovies();
      })
      .catch((err) => console.log(err));
  };

  // функция фильтрации фильмов по поисковому запросу
  const filterFilms = (filmsList, searchData) => {
    let searchedFilms = filmsList ? [...filmsList] : [];
    // Фильтрация по поисковому запросу
    searchedFilms = searchedFilms.filter((film) => film.nameRU.toLowerCase().includes(searchData));

    if (isCheckBoxActive) {
      // Фильтрация по активному состоянию чекбокса и длительности
      searchedFilms = searchedFilms.filter((film) => film.duration <= 40);
    }

    if (location.pathname === '/movies') {
      setFilteredFilms(searchedFilms);
    } else {
      setFilteredLikedMovies(searchedFilms);
      setIsLikedSearchPerformed(true);
    }
  };

  // функция поиска по лайкнутым фильмам
  const handleSubmitSaved = (savedSearchValue) => {
    filterFilms(likedMovies, savedSearchValue);
  };

  // хук который сохраняет в локалсторедж отфильтрованные по поисковому запросу фильмы
  useEffect(() => {
    if (filteredFilms && location.pathname === '/movies') {
      localStorage.setItem('savedFilms', JSON.stringify(filteredFilms));
    }
  }, [filteredFilms, location.pathname]);

  // хук который получает сохраненные по поисковому запросу фильмы
  useEffect(() => {
    if (location.pathname === '/movies') {
      const savedFilms = localStorage.getItem('savedFilms');
      if (savedFilms) {
        setFilms(JSON.parse(savedFilms));
      }
    }
    setIsLikedSearchPerformed(false);
  }, [location.pathname]);

  // хук который фильтрует фильмы по поисковому запросу
  useEffect(() => {
    filterFilms(films, searchValue);
  }, [films, searchValue]);

  // функция поиска фильма
  const handleSearch = (e) => {
    setIsLoading(true);
    if (e.target.elements.film.value === '') {
      alert('Нужно ввести ключевое слово');
    } else {
      MoviesApi.getMovies()
        .then((res) => {
          setFilms(res);
          setIsSearchPerformed(true);
        })
        .catch(() => {
          setisError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // функция регистрации
  const handleRegister = async (values) => {
    const { email, password, name } = values;
    try {
      await MainApi.register(email, password, name);
      localStorage.setItem('isLoggedIn', true);
      setLoggedIn(true);
      setPopUpIsOpen(true);
      navigate('/movies', { relace: true });
    } catch (err) {
      console.log(err);
    }
  };

  // функция логина
  const handleLogin = async (email, password) => {
    try {
      await MainApi.login(email, password);
      localStorage.setItem('isLoggedIn', true);
      setLoggedIn(true);
      setPopUpIsOpen(true);
      navigate('/movies', { replace: true });
    } catch (err) {
      setPopUpIsOpen(true);
      console.log(err);
    }
  };

  // функция логаута
  const handleLogout = () => {
    MainApi.logOut()
      .then(() => {
        localStorage.clear();
        setLoggedIn(false);
        navigate('/', { replace: true });
      });
  };

  // функция обновления пользователя
  const handleUpdateUser = (data) => {
    MainApi.updateUserInfo(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .catch((err) => console.log(err));
  };

  // функция проверки токена
  const checkIsLoggedIn = () => {
    const loginCheck = localStorage.getItem('isLoggedIn');
    if (loginCheck) {
      navigate('/movies', { replace: true });
      setLoggedIn(true);
    }
  };

  // // проверка токена
  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  const closePopUp = () => {
    setPopUpIsOpen(false);
  };

  return (
    <div className="page">
      <BurgerMenuProvider>
      <CurrentUserContext.Provider value={currentUser}>
      <Popup isOpen={popUpIsOpen} loggedIn={loggedIn} onClose={closePopUp}/>
      <Routes>

        <Route path="/" element={
          <>
          <Header isLoggedIn={loggedIn}/>
          <Main testLogOut={handleLogout}/>
          <Footer />
          </>
        }/>

        <Route path="/movies" element={
          <>
          <Header isLoggedIn={loggedIn}/>
          {<ProtectedRouteElement element={Movies}
            isLoggedIn={loggedIn}
            handleSearch={handleSearch}
            isLoading={isLoading}
            films={filteredFilms}
            isSearchPerformed={isSearchPerformed}
            isError={isError}
            setIsCheckBoxActive={setIsCheckBoxActive}
            likedMovies={likedMovies}
            isLoaded={isLoaded}
            savedMovies={getLikedMovies}
            isCheckBoxActive={isCheckBoxActive}
            />}
          <Footer />
          </>
        }/>

        <Route path="/saved-movies" element={
          <>
          <Header isLoggedIn={loggedIn}/>
          {<ProtectedRouteElement element={SavedMovies}
          isLoggedIn={loggedIn}
          handleSearch={handleSearch}
          likedMovies={isLikedSearchPerformed ? filteredLikedMovies : likedMovies}
          isLoaded={isLoaded}
          onDelete={handleMovieDelete}
          handleSubmitSaved={handleSubmitSaved}
          setIsCheckBoxActive={setIsCheckBoxActive}
            />}
          <Footer />
          </>
        }/>

        <Route path="/profile" element={
          <>
          <Header isLoggedIn={loggedIn}/>
          <ProtectedRouteElement
            element={Profile}
            isLoggedIn={loggedIn}
            handleUpdateUser={handleUpdateUser}
            logOut={handleLogout}
          />
          </>
        }/>

        <Route path="/signin" element={<Login onSubmit={handleLogin} />}/>
        <Route path="/signup" element={<Register onSubmit={handleRegister}/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </CurrentUserContext.Provider>
      </BurgerMenuProvider>
    </div>
  );
}

export default App;
