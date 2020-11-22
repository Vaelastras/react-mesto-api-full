import React from "react";
import {CurrentUserContext} from '../context/CurrentUserContext'

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card)
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (`element__trash ${isOwn ? 'element__trash_type_active' : '' }`);
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_type_active' : ''}`

  return(
    <div className="element">
      <img className="element__photo" src={card.link} onClick={handleClick} alt={card.link} />
      <button className={cardDeleteButtonClassName} onClick={handleCardDelete}  type="button" aria-label="Удалить"/>
      <div className="element__row">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-section">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="поставить 'лайк'"/>
          <span className="element__like-counter">{card.likes.length > 0 ? `${card.likes.length}` : 0}</span>
        </div>
      </div>
    </div>
  )
}

export default Card