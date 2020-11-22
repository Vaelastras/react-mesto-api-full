import React from "react";

function ImagePopup({card, isClose}) {
  return (
    <div className={`popup popup_type_image ${card && 'popup_active'}`}>
      <div className="popup__image-container">
        <button className="popup__close" type="reset" aria-label="Закрыть" onClick={isClose}/>
        <img className="popup__image" 
          src={`${card.link}`}  
          alt={card.name}/>
        <p className="popup__image-title">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup