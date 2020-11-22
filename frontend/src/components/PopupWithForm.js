import React from "react";

function PopupWithForm({name, title, isOpen, onClose, onSubmit, submitTitle, isLoading, children}) {
  return(
    <div className={`popup popup_type_${name} ${isOpen && 'popup_active'}`} >
      <form
        className="popup__container popup__container_type_profile"
        method="GET"
        name={`${name}`}
        onSubmit={onSubmit}
        action="#"
        noValidate
      >
        <button
          className="popup__close"
          type="reset"
          aria-label="закрыть"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        {children}
        <button className="popup__submit" type="submit">{isLoading ? `Сохраняю...` : `${submitTitle}`}</button>
      </form>
    </div>

  )
}
export default PopupWithForm