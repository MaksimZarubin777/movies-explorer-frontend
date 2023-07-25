import React, { useEffect } from 'react';
import './Popup.css';
import Popup from './Popup';
import authOk from '../../images/auth_v.svg';
// import authBad from '../../images/auth_x.svg';

function PopupLogin({
  onClose,
  isOpen,
}) {

  return (
    <Popup
    onClose={onClose}
    isOpen={isOpen}>
      <>
        <img src={authOk} className='popup__auth_image' alt='Success'></img>
        <h3 className="popup__auth_h3">Все прошло успешно!</h3>
      </>
    </Popup>
  );
}

export default PopupLogin;
