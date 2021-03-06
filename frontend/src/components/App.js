import React, {useState, useEffect} from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from './EditProfilePopup'
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupDelete from "./PopupDelete";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

import {api} from '../utils/Api'
import {CurrentUserContext} from '../context/CurrentUserContext'
import * as auth from '../utils/auth'

function App () {

  // стейты попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardDelete] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)


  //стейт логина пользователя
  const [loggedIn, setLoggedIn] = useState(false)

  //cтейт окна инфопопапа
  const [infoPopupOpen, setInfoPopupOpen] = useState(false);

  //стейт отображения ошибки в инфопопе
  const [isSuccess, setIsSuccess] = useState(false)

  //user-email header show
  const [email, setEmail] = useState('')

  const [token, setToken] = useState('');

  const history = useHistory();

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      setToken(jwt);

      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            history.push('./');
          }
        })
        .catch(err => {
          console.log(err);
          history.push('./sign-in');
        });
    }
  }

  useEffect(() => {
    tokenCheck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    if (loggedIn){
      api.getInfoFromServer(token)
        .then(([userData, initialCards]) => {
          setCurrentUser(userData)
          setCards(initialCards)
      })
      .catch(err => console.log(err));
    }
  }, [loggedIn, token])

  useEffect(()=> {
    document.addEventListener('keydown', handleEscapeClose)
    document.addEventListener("mousedown", handleOverlayClose)

    return () =>{
      document.removeEventListener('keydown', handleEscapeClose)
      document.removeEventListener("mousedown", handleOverlayClose )
    }
  })

  function handleEscapeClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups()
    }
  }
  function handleOverlayClose(e) {
    if (e.target.classList.contains('popup')) {
      closeAllPopups()
    }
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(false);
    setInfoPopupOpen(false)
  }

  //setstate block

  function handleEditAvatarClick () { setIsEditAvatarPopupOpen(true) }
  function handleEditProfileClick() { setIsEditProfilePopupOpen(true) }
  function handleAddPlaceClick() { setIsAddPlacePopupOpen(true) }
  function handleCardClick(card) { setSelectedCard(card) }
  function handleDeleteCardClick() { setIsDeletePopupOpen(true)}


 // fetch handlers
  function handleUpdateUser(data) {
    setIsLoading(true)
    api.patchUserProfile(data, token)
      .then((res) => {
        setCurrentUser(res)
        setIsLoading(false)
        closeAllPopups()
      }
    )
    .catch(err => console.log(err));
  }
  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api.patchAvatar(data, token)
      .then((res) => {
        setCurrentUser(res)
        setIsLoading(false)
        closeAllPopups();
      }
    )
    .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.find(i => i === currentUser._id); // tyt false

    if (!isLiked) {
      api.putLike({cardId: card._id}, token)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c)

          setCards(newCards)
        })
        .catch(err => console.log(err));
    } else {
      api.deleteLike({cardId: card._id}, token)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c)
          setCards(newCards)
        })
        .catch(err => console.log(err));
    }
  }

  function handleConfirmCardDelete() {
    const isOwn = cardDelete.owner === currentUser._id;
    setIsLoading(true)
    api.deleteCard(cardDelete._id, token, !isOwn)    
      .then((newCard) => {
        setCards(cards.filter((c) => c._id === cardDelete._id ? !newCard : c));
        setIsLoading(false)
        closeAllPopups()
      })
      .catch(err => console.log(err));

  }
  function handleCardDelete(card) {
    setCardDelete(card);
    handleDeleteCardClick();
  }

  function handleAddPlaceSubmit(item){
    api.postUserCard(item, token)
      .then((res) => {
        setCards([...cards, res.card]);
        closeAllPopups()
        }
      )
      .catch(err => console.log(err));
  }

const handleRegisterConfirm = (foo) => {
  setInfoPopupOpen(true)
  setIsSuccess(foo);
}

 const handleRegister = (email, password) => {
   auth.register(email, password)
     .then((res) => {
       if (res) {
         handleRegisterConfirm(true)
         history.push('./sign-in')
       }
     })
     .catch((err) => {
       handleRegisterConfirm(false)
       console.log(err.message)
     })
 }

 const handleLogin = (email, password) => {
    auth.authorize(email, password)
      .then(data => {
        if (data.token) {
          setToken(data.token);
          setEmail(email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => console.log(err.name, err.message))
 }

 const onSignOut = () => {
   localStorage.removeItem('jwt');
   history.push('./login');
   setEmail('')
   setLoggedIn(false)
 }




  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="root">
          <Header
            onSignOut={onSignOut}
            email={email}
            loggedIn={ loggedIn }
          />
          <Switch>

            <Route path='/sign-in'>
              <Login
                onLogin={handleLogin}
              />
            </Route>

            <Route path='/sign-up'>
              <Register onRegister={handleRegister}/>
            </Route>

            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace ={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <Route path='/'>
              {loggedIn ? <Redirect to='/'/> : <Redirect to='/sign-in'/>}
            </Route>

          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

         <AddPlacePopup
           isOpen={isAddPlacePopupOpen}
           onClose={closeAllPopups}
           onAddPlace={handleAddPlaceSubmit}
         />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <ImagePopup
            card={selectedCard}
            isClose={closeAllPopups}
          />

          <PopupDelete
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleConfirmCardDelete}
          />

          <InfoTooltip
            isOpen={infoPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
            isClose={closeAllPopups}
          >
          </InfoTooltip>


        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
