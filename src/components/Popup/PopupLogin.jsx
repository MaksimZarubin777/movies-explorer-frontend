import React, { useEffect } from 'react';
import './Popup.css';
import authOk from '../../images/auth_v.svg';
import authBad from '../../images/auth_x.svg';

function PopupLogin({
  onClose,
  loggedIn,
  isOpen,
}) {
  // закрытие попапа через эскейп
  useEffect(() => {
    function handleEscapeClose(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscapeClose);

    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
    };
  });

  // закрытие попапа через клик на оверлей
  useEffect(() => {
    function handleOverLayClickClose(event) {
      const { classList } = event.target;
      if (classList.contains('popup_opened')) {
        onClose();
      }
    }
    document.addEventListener('click', handleOverLayClickClose);
    return () => {
      document.removeEventListener('click', handleOverLayClickClose);
    };
  });

  // let popupContent;
  // if (loggedIn && !isSearched && !isProfileChanged) {
  //   popupContent = (
  //     <>
  //       <img src={authOk} className='popup__auth_image' alt='Success'></img>
  //       <h3 className="popup__auth_h3">Все прошло успешно!</h3>
  //     </>
  //   );
  // } else if (loggedIn && isSearched) {
  //   popupContent = (
  //     <>
  //       <img src={authBad} className='popup__auth_image' alt='Error'></img>
  //       <h3 className="popup__auth_h3">Нечего искать - введите что-нибудь в поиск и попробуйте снова</h3>
  //     </>
  //   );
  // } else if (loggedIn && isProfileChanged) {
  //   popupContent = (
  //     <>
  //       <img src={authOk} className='popup__auth_image' alt='Error'></img>
  //       <h3 className="popup__auth_h3">Данные успешно обовлены!</h3>
  //     </>
  //   );
  // } else if (loggedIn && !isProfileChanged) {
  //   popupContent = (
  //     <>
  //       <img src={authBad} className='popup__auth_image' alt='Error'></img>
  //       <h3 className="popup__auth_h3">Что-то пошло не так! Попробуйте ещё раз.</h3>
  //     </>
  //   );
  // } else {
  //   popupContent = (
  //     <>
  //       <img src={authBad} className='popup__auth_image' alt='Error'></img>
  //       <h3 className="popup__auth_h3">Что-то пошло не так! Попробуйте ещё раз.</h3>
  //     </>
  //   );
  // }

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id="popup-auth">
      <div className="popup__container_auth">
        <button className="popup__button-close" id="popup-auth-close" type="button" onClick={onClose}></button>
        {loggedId ? (
          <>
            <img src={authOk} className='popup__auth_image' alt='Success'></img>
            <h3 className="popup__auth_h3">Все прошло успешно!</h3>
          </>
        ) : (
        <>
          <img src={authBad} className='popup__auth_image' alt='Success'></img>
          <h3 className="popup__auth_h3">Что-то пошло не так</h3>
        </>
        )}
      </div>
    </div>
  );
}

export default PopupLogin;
