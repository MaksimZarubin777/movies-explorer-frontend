import './App.css';
import { Routes, Route } from 'react-router-dom';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { BurgerMenuProvider } from '../../context/BurgerMenuContext.jsx';
import PageNotFound from '../PageNotFound/PageNotFound.jsx';

function App() {
  return (
    <div className="page">
      <BurgerMenuProvider>
      <Routes>
        <Route path="/" element={
          <>
          <Header />
          <Main/>
          <Footer />
          </>
        }/>
        <Route path="/movies" element={
          <>
          <Header />
          <Movies/>
          <Footer />
          </>
        }/>
        <Route path="/saved-movies" element={
          <>
          <Header />
          <SavedMovies/>
          <Footer />
          </>
        }/>
        <Route path="/profile" element={
          <>
          <Header />
          <Profile/>
          </>
        }/>
        <Route path="/signin" element={<Login />}/>
        <Route path="/signup" element={<Register />}/>
        <Route path="/pagenotfound" element={<PageNotFound />} />
      </Routes>
      </BurgerMenuProvider>
    </div>
  );
}

export default App;
