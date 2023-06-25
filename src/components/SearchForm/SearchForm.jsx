import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search-form'>
      <div className='search-form__container'>
        <form className='search-form__form'>
          <input className='search-form__input' placeholder='Фильм' />
          <button className='search-form__button'></button>
        </form>
        <div className='search-form__filter'>
          <label className='switch'>
            <input type='checkbox' className='search-form__filter_checkbox'/>
            <span className='slider'></span>
          </label>
          <p className='search-form__filter_text'>Короткометражки</p>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
