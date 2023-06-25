import './MoviesCard.css';

function MoviesCard({ film }) {
  const currentPath = window.location.pathname;

  return (
    <div className='movies-card'>
        <img src={film.img} alt='' className='movies-card__img'></img>
        <h3 className='movies-card__title'>{film.name}</h3>
        {currentPath === '/saved-movies' ? (
          <span className='movies-card__delete'/>
        ) : (
          <span className={film.liked ? 'movies-card__like movies-card__like_on' : 'movies-card__like movies-card__like_off'}/>
        )}
        <p className='movies-card__duration'>{film.duration}</p>
    </div>
  );
}

export default MoviesCard;
