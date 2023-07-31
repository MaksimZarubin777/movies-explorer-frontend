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
import PopupLogin from '../Popup/PopupLogin.jsx';
import PopupRegester from '../Popup/PopupRegester.jsx';
import PopupProfileUpdate from '../Popup/PopupProfileUpdate.jsx';
import PopupNoInput from '../Popup/PopupNoInput.jsx';
import { SHORT_MOVIES_DURATION } from '../../vendor/constants';

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
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // popups
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useState(false);
  const [isPopupRegisterOpen, setIsPopupRegisterOpen] = useState(false);
  const [isPopupProfileUpdateOpen, setIsPopupProfileUpdateOpen] = useState(false);
  const [isPopupNoInputOpen, setIsPopupNoInputOpen] = useState(false);
  const [isProfileChanged, setisProfileChanged] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const searchValue = localStorage.getItem('searchValue');
  const navigate = useNavigate();
  const location = useLocation();

  // этой функцией проверяет достпен ли еще jwt и если нет, удаляем локалсторедж и loggedIn
  const getContent = () => {
    MainApi.getUser()
      .then((user) => {
        setCurrentUser(user);
        // setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
        setIsSearchPerformed(false);
        localStorage.clear();
        localStorage.removeItem('isLoggedIn');
        navigate('/', { replace: true });
      });
  };

  useEffect(() => {
    getContent();
  }, []);

  // функция получения фильмов с лайком
  const getLikedMovies = () => {
    MainApi.getFilms()
      .then((data) => {
        setLikedMovies(data.data);
        setFilteredLikedMovies(data.data);
        localStorage.setItem('likedMovies', JSON.stringify(data.data));
        setisLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  // функция получения данных пользователя
  const getUserInformation = () => {
    MainApi.getUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(err));
  };

  // хук вызова функция полчения данных если пользователь залогинен
  useEffect(() => {
    if (loggedIn) {
      getUserInformation();
      getLikedMovies();
    }
  }, [loggedIn]);

  // функция фильтрации фильмов по поисковому запросу
  const filterFilms = (filmsList, searchData) => {
    let searchedFilms = filmsList ? [...filmsList] : [];
    // Фильтрация по поисковому запросу
    searchedFilms = searchedFilms.filter((film) => film.nameRU.toLowerCase().includes(searchData));

    if (isCheckBoxActive) {
      // Фильтрация по активному состоянию чекбокса и длительности
      searchedFilms = searchedFilms.filter((film) => film.duration <= SHORT_MOVIES_DURATION);
    }

    if (location.pathname === '/movies') {
      setFilteredFilms(searchedFilms);
    } else {
      setFilteredLikedMovies(searchedFilms);
      localStorage.setItem('filteredLikedMovies', JSON.stringify(searchedFilms));
      setIsLikedSearchPerformed(true);
    }
  };

  // функция поиска по лайкнутым фильмам
  const handleSubmitSaved = (e, savedSearchValue) => {
    if (e.target.elements.film.value === '') {
      setIsPopupNoInputOpen(true);
      setIsLoading(false);
    }
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

  // хук фильтрации фильмов по активации чекбокса
  useEffect(() => {
    if (location.pathname === '/movies') {
      filterFilms(JSON.parse(localStorage.getItem('films')), searchValue);
    } else {
      filterFilms(likedMovies, searchValue);
    }
  }, [isCheckBoxActive]);

  // функция поиска фильма
  const handleSearch = (e) => {
    if (e.target.elements.film.value === '') {
      setIsPopupNoInputOpen(true);
      setIsLoading(false);
    } else if (!isSearchPerformed) {
      setIsLoading(true);
      MoviesApi.getMovies()
        .then((res) => {
          setFilms(res);
          localStorage.setItem('films', JSON.stringify(res));
          setIsSearchPerformed(true);
        })
        .catch(() => {
          setisError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const localFilms = JSON.parse(localStorage.getItem('films'));
      setFilms(localFilms);
      setIsLoading(false);
    }
  };

  // хук проверки есть ли полный список фильмов в локалсторедж
  useEffect(() => {
    const localedFilms = JSON.parse(localStorage.getItem('films'));
    if (localedFilms) {
      setIsSearchPerformed(true);
    }
  }, []);

  // функция регистрации
  const handleRegister = async (values) => {
    setIsSubmitting(true);
    const { email, password, name } = values;
    try {
      await MainApi.register(email, password, name);
      localStorage.setItem('isLoggedIn', true);
      setLoggedIn(true);
      getLikedMovies();
      setIsPopupRegisterOpen(true);
      navigate('/movies', { relace: true });
    } catch (err) {
      setIsPopupRegisterOpen(true);
      console.log(err);
    }
    setIsSubmitting(false);
  };

  // функция логина
  const handleLogin = async (email, password) => {
    setIsSubmitting(true);
    try {
      await MainApi.login(email, password);
      localStorage.setItem('isLoggedIn', true);
      setLoggedIn(true);
      setIsPopupLoginOpen(true);
      getLikedMovies();
      navigate('/movies', { replace: true });
    } catch (err) {
      setIsPopupLoginOpen(true);
      console.log(err);
    }
    setIsSubmitting(false);
  };

  // функция логаута
  const handleLogout = () => {
    MainApi.logOut()
      .then(() => {
        localStorage.clear();
        setLoggedIn(false);
        setIsSearchPerformed(false);
        navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  // функция обновления пользователя
  const handleUpdateUser = (data) => {
    setIsSubmitting(true);
    MainApi.updateUserInfo(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setIsPopupProfileUpdateOpen(true);
        setisProfileChanged(true);
      })
      .catch((err) => {
        console.log(err);
        setIsPopupProfileUpdateOpen(true);
      });
    setIsSubmitting(false);
  };

  // функция проверки токена
  const checkIsLoggedIn = () => {
    const loginCheck = localStorage.getItem('isLoggedIn');
    if (loginCheck) {
      setLoggedIn(true);
    }
    setIsTokenChecked(true);
  };

  // // проверка токена
  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  const closeAllPopups = () => {
    setIsPopupLoginOpen(false);
    setIsPopupRegisterOpen(false);
    setIsPopupProfileUpdateOpen(false);
    setIsPopupNoInputOpen(false);
  };

  return (
    <div className="page">
      <BurgerMenuProvider>
      <CurrentUserContext.Provider value={currentUser}>
      <PopupLogin
        isOpen={isPopupLoginOpen}
        loggedIn={loggedIn}
        onClose={closeAllPopups}
      />
      <PopupRegester
        isOpen={isPopupRegisterOpen}
        loggedIn={loggedIn}
        onClose={closeAllPopups}
      />
      <PopupProfileUpdate
        isOpen={isPopupProfileUpdateOpen}
        isProfileChanged={isProfileChanged}
        onClose={closeAllPopups}
      />
      <PopupNoInput
        isOpen={isPopupNoInputOpen}
        onClose={closeAllPopups}
      />
      {isTokenChecked && (
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
            likedMovies={JSON.parse(localStorage.getItem('likedMovies'))}
            setLikedMovies={setLikedMovies}
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
          isLoading={isLoading}
          isSearchPerformed={isSearchPerformed}
          setLikedMovies={setLikedMovies}
          setFilteredLikedMovies={setFilteredLikedMovies}
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
            isSubmitting={isSubmitting}
          />
          </>
        }/>

        <Route path="/signin" element={<Login onSubmit={handleLogin} isSubmitting={isSubmitting} isLoggedIn={loggedIn}/>}/>
        <Route path="/signup" element={<Register onSubmit={handleRegister} isSubmitting={isSubmitting} isLoggedIn={loggedIn}/>}/>
        <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
      </CurrentUserContext.Provider>
      </BurgerMenuProvider>
    </div>
  );
}

export default App;
