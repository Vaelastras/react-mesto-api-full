import React from "react";
import Card from "./Card";
import {CurrentUserContext} from '../context/CurrentUserContext'

function Main(props) {
  const {cards, onEditAvatar, onEditProfile, onAddPlace, onCardDelete, onCardLike, onCardClick} = props;
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <main className="content">

      <section className="profile">
        <div className="profile__image">
          <div className="profile__avatar" alt={''} style={{ backgroundImage: `url(${currentUser.avatar})` }}/>
          <button className='profile__edit-avatar' type="button" aria-label="Редактировать аватар" onClick={onEditAvatar} />
        </div>

        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}/>
          </div>
            <p className="profile__job-description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить элемент" onClick={onAddPlace}/>
      </section>

      <section className="elements" aria-label="элементы">
        {cards.map((item, index) =>
          <Card
            key={index}
            card={item}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onCardClick={onCardClick}
          />
        )}
      </section>
    </main>
  )
}

export default Main;