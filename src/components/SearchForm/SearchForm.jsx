import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm({
  handleSubmit,
  handleSubmitSaved,
  setIsCheckBoxActive,
  isCheckBoxActive,
}) {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);

  // устанавливем статус чекбокса
  const handleCheckBox = (e) => {
    setIsCheckBoxActive(e.target.checked);
    setCheckBoxStatus(e.target.checked);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (location.pathname === '/movies') {
      localStorage.setItem('searchValue', searchValue.toLowerCase());
      localStorage.setItem('isCheckBoxActive', isCheckBoxActive);
      handleSubmit(e);
    } else {
      localStorage.setItem('savedSearchValue', searchValue.toLowerCase());
      handleSubmitSaved(searchValue.toLowerCase());
    }
  };

  // хук получения данных с локал сторедж
  useEffect(() => {
    if (location.pathname === '/movies') {
      const savedSearchValue = localStorage.getItem('searchValue');
      const savedCheckBoxStatus = localStorage.getItem('isCheckBoxActive');
      if (savedSearchValue) {
        setSearchValue(savedSearchValue);
      }
      setCheckBoxStatus(JSON.parse(savedCheckBoxStatus));
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
            <input type='checkbox' checked={checkBoxStatus} className='search-form__filter_checkbox' onChange={handleCheckBox}/>
            <span className='slider'></span>
          </label>
          <p className='search-form__filter_text'>Короткометражки</p>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
