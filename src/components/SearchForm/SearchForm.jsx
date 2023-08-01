import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm({
  handleSubmit,
  handleSubmitSaved,
  setIsCheckBoxActive,
  isCheckBoxActive,
  setIsCheckBoxActiveOnSavedMovies,
}) {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);
  const [checkBoxStatusOnSavedMovies, setCheckBoxStatusOnSavedMovies] = useState(false);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  // устанавливем статус чекбокса
  const handleCheckBox = (e) => {
    if (location.pathname === '/movies') {
      setIsCheckBoxActive(e.target.checked);
      setCheckBoxStatus(e.target.checked);
      localStorage.setItem('checkBoxStatus', e.target.checked);
    } else {
      setIsCheckBoxActiveOnSavedMovies(e.target.checked);
      setCheckBoxStatusOnSavedMovies(e.target.checked);
    }
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (location.pathname === '/movies') {
      localStorage.setItem('searchValue', searchValue.toLowerCase());
      localStorage.setItem('isCheckBoxActive', isCheckBoxActive);
      handleSubmit(e);
    } else {
      localStorage.setItem('savedSearchValue', searchValue.toLowerCase());
      handleSubmitSaved(e, searchValue.toLowerCase());
    }
  };

  // хук получения данных с локал сторедж
  useEffect(() => {
    if (location.pathname === '/movies') {
      const savedSearchValue = localStorage.getItem('searchValue');
      const savedCheckBoxStatus = JSON.parse(localStorage.getItem('checkBoxStatus'));
      if (savedSearchValue) {
        setSearchValue(savedSearchValue);
      }
      setCheckBoxStatus(savedCheckBoxStatus);
    } else {
      // Когда компонент монтируется на странице /saved-movies, сбрасываем статус чекбокса в false
      setCheckBoxStatusOnSavedMovies(false);
    }
  }, [location.pathname]);

  return (
    <section className='search-form'>
      <div className='search-form__container'>
        <form className='search-form__form' onSubmit={handleSubmitSearch}>
          <input className='search-form__input'
            placeholder='Фильм'
            name='film'
            value={searchValue}
            onChange={handleInputChange}/>
          <button className='search-form__button'></button>
        </form>
        <div className='search-form__filter'>
          <label className='switch'>
            <input type='checkbox' checked={location.pathname === '/movies' ? checkBoxStatus : checkBoxStatusOnSavedMovies} className='search-form__filter_checkbox' onChange={handleCheckBox}/>
            <span className='slider'></span>
          </label>
          <p className='search-form__filter_text'>Короткометражки</p>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
