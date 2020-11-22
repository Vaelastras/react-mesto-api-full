import React, {useEffect, useState} from "react";
import Applogo from "../images/logo.svg";
import { Link, Route, } from "react-router-dom";

function Header({ onSignOut, email, loggedIn }) {

  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const [closeMenuButtonActive, setCloseMenuButtonActive] = useState(false);

  const handleButtonClick = () => {
    setDropDownIsOpen(!dropDownIsOpen); // замена крестика
    setCloseMenuButtonActive(!closeMenuButtonActive); // дл отрисовки разметки над лого
  }

  useEffect(() => {
    handleButtonClick() }
    , [])

  const layout = (
    <div className={`header__info ${closeMenuButtonActive && loggedIn ? 'header__info_type_mobile' : ''}`}>
      <p className="header__email">{email}</p>
      <button className="header__button" onClick={onSignOut} type="button">Выйти</button>
    </div>
  )


  return (
    <header className="header">
      <div className={`header__wrapper ${ dropDownIsOpen ? '' : 'header__wrapper_type_active' }`}>
        {layout}
      </div>
        <div className='header__container'>
          <img className="header__logo" src={ Applogo } alt="Логотип проекта 'Mesto'" />
          { loggedIn ? <button className={`header__dropdown ${dropDownIsOpen ? '' : 'header__dropdown_active'}`} onClick={handleButtonClick} type='button'/>: ''}
          <nav className="header__routes">

            <Route exact path ='/sign-up'>
              <Link className="header__link" to='/sign-in'>Войти</Link>
            </Route>

            <Route exact path="/sign-in">
              <Link className="header__link" to="/sign-up">Регистрация</Link>
            </Route>

            <Route exact path="/">
              <div className={`header__wrapper ${ dropDownIsOpen ? 'header__wrapper_type_active' : '' }`}>
                {layout}
              </div>
            </Route>
          </nav>
        </div>

    </header>
  )
}

export default Header