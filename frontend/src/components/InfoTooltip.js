import React from "react";
import successLogo from '../images/Success.png'
import failLogo from '../images/Fail.png'

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {

  return (
    <div className={`popup ${isOpen && 'popup_active'}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose} type="button"/>
        <div className="popup__wrapper">
          <img className="popup__infostatus" src={`${ isSuccess ? successLogo : failLogo}`} alt="statusLogo"/>
          <h3 className="popup__title popup__text">{`${ isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}`}</h3>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip