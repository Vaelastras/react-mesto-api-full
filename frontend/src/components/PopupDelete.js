import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDelete ({isOpen, onClose, onSubmit, isLoading}) {
function handleSubmit(e) {
  e.preventDefault();
  onSubmit();
}

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitTitle='Да'
      name='popup-delete'
      title='Вы уверены?'
    />

  )
  
}

export default PopupDelete