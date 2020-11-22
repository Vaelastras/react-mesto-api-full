import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const avatarRef = React.useRef('')

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitTitle="Сохранить">

      <fieldset className="popup__inputs">
        <input
          ref={avatarRef}
          className="popup__input popup__input_type_url"
          type="url"
          name="avatar"
          id="url-input-avatar"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__error" id="url-input-avatar-error" />
      </fieldset>
    </PopupWithForm>
  )
}
export default EditAvatarPopup