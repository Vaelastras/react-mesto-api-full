import React, {useState} from "react";
import {Link} from "react-router-dom";


const Register = ({ onRegister }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(email, password)
  }

  return (
    <form className='login__container' onSubmit={handleSubmit}>
      <h3 className='popup__title login__title'>Регистрация</h3>
      <input
        onChange={handleEmailChange}
        className='popup__input login__input'
        type='email'
        name='email'
        placeholder='Email'
        pattern='\S+@\S+\.\S+'
        title='Пожалуйста введите email в верном формате, например putin@kremlin.ru'
        value={email || ''}
        required
      />
      <input
        onChange={handlePasswordChange}
        className='popup__input login__input'
        type='password'
        name='password'
        placeholder='Пароль'
        pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$'
        title="Требуется минимум 1 строчная буква, 1 прописная буква и 1 цифра"
        value={password || ''}
        required
      />
      <button className='popup__submit login__submit' type='submit'>Зарегистрироваться</button>
      <p className="popup__login-confirm">
        <Link to='/sign-in' className='popup__link'>Уже зарегистрированы? Войти</Link>
      </p>
    </form>

  )
};

export default Register;
