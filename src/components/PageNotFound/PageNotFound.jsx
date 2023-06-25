import './PageNotFound.css';

function PageNotFound() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className='page-not-found'>
      <div className='page-not-found__container'>
        <h2 className='page-not-found__title'>404</h2>
        <p className='page-not-found__subtitle'>Страница не найдена</p>
        <p className='page-not-found__link' onClick={ goBack }>Назад</p>
      </div>
    </div>
  );
}

export default PageNotFound;
