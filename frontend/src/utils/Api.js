  class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInfoFromServer() {
    return Promise.all([this.getUserInfo(),this.getInitialCards()])
  }

  // обработчик респонсов сервера
  _handleResponse(res){
    if (res.ok) {
      return res.json();
      } else {
      return Promise.reject(`Error! : ${res.status}`)
    }
  }

  // получение начальных данных от пользователя
  getUserInfo() { // Запрос на загрузку данных пользователя
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,

    })
    .then(this._handleResponse)
  }


  // получение серверных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  //установка данных профиля
  patchUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._handleResponse)
  }


  // смена аватары
  patchAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`,  {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatar
      })
    })
      .then(this._handleResponse)
  }

 postUserCard(item) {
  return fetch(`${this._baseUrl}/cards`,  {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
    .then(this._handleResponse)
  }

// START DANGERZONE

  putLike({cardId}) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => this._handleResponse(res));
  };




  // снятие лаека
  deleteLike({cardId}) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
      }
    )
      .then(this._handleResponse)
  }

  // удалить карточку
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`,  {
      method: 'DELETE',
      headers: this._headers
      }
    )
      .then(this._handleResponse)
  }

}


export const api = new Api({
  // baseUrl:'https://mesto.nomoreparties.co/v1/cohort-14',
  baseUrl:'http://localhost:3000',
  headers: {
    'Authorization': localStorage.getItem('jwt'),
    'Content-Type': 'application/json'}
});
