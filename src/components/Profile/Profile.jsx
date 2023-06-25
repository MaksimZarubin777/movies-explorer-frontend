import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Profile.css';

const profile = {
  name: 'Максим',
  email: 'maksim@maksim.ru',
};

function Profile() {
  const [edit, setEdit] = useState(true);
  const navigate = useNavigate();

  const handleEdit = () => {
    setEdit(false);
  };

  const handleLogOut = () => {
    navigate('/');
  };

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, {profile.name}!</h2>
      <form className='profile__form-edit'>
        <div className='profile__form-edit_element'>
          <p className='profile__form-edit_title'>Имя</p>
          <input className='profile__form-edit_input' disabled={edit} placeholder={profile.name}></input>
        </div>
        <div className='profile__form-edit_element'>
          <p className='profile__form-edit_title'>E-mail</p>
          <input className='profile__form-edit_input' disabled={edit} placeholder={profile.email}></input>
        </div>
        {edit ? (
          <>
            <p className="profile__options" onClick={ handleEdit }>Редактировать</p>
            <p className="profile__options" onClick={ handleLogOut }>Выйти из аккаунта</p>
          </>
        ) : (
        <>
          <button className='profile__button'>Сохранить</button>
        </>
        )}
      </form>
    </div>
  );
}

export default Profile;
