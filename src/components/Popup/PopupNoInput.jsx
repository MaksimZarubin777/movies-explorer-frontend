import React, { useEffect } from 'react';
import './Popup.css';
import authBad from '../../images/auth_x.svg';

function PopupNoInput({
  onClose,
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

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id="popup-auth">
      <div className="popup__container_auth">
        <button className="popup__button-close" id="popup-auth-close" type="button" onClick={onClose}></button>
          <>
            <img src={authBad} className='popup__auth_image' alt='Success'></img>
            <h3 className="popup__auth_h3">Нечего искать - введите что-нибудь в поиск и попробуйте снова</h3>
          </>
      </div>
    </div>
  );
}

export default PopupNoInput;
