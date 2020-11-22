import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpen, onClose, onAddPlace}) {

  const titleRef = React.useRef('')
  const linkRef = React.useRef('')

  React.useEffect(() => {
    titleRef.current.value = '';
    linkRef.current.value = '';
  },[isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: titleRef.current.value,
      link: linkRef.current.value
    })
  }

  return(
    <PopupWithForm
      title="Новое место"
      name="new-place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitTitle={'Создать'}>

      <fieldset className="popup__inputs">
        <input
          ref={titleRef}
          className="popup__input popup__input_type_title"
          type="text"
          name="title"
          id="title-input"
          placeholder="Название"
          minLength="1"
          maxLength="30"
          required
        />
        <span className="popup__error" id="title-input-error" />
        <input
          ref={linkRef}
          className="popup__input popup__input_type_url"
          type="url"
          name="url"
          id="url-input"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error" id="url-input-error"/>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup