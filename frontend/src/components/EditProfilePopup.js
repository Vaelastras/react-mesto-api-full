import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../context/CurrentUserContext'

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  function handleNameUpdater(e) {
    setName(e.target.value);
  }

  function handleDescriptionUpdater(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e){
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitTitle={'Сохранить'}>

      <fieldset className="popup__inputs">
        <input
          onChange={handleNameUpdater}
          value={name || ''}
          className="popup__input popup__input_type_name"
          type="text"
          name="name"
          id="name-input"
          placeholder="Введите имя"
          minLength="2"
          maxLength="40"
          pattern="[a-zA-Zа-яёА-ЯЁ\s-]*"
          required
        />
        <span className="popup__error" id="name-input-error"/>
        <input
          onChange={handleDescriptionUpdater}
          value={description || ''}
          className="popup__input popup__input_type_job"
          type="text"
          name="about"
          id="about-input"
          placeholder="Введите профессию"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error" id="about-input-error"/>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup