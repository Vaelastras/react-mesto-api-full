  class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInfoFromServer(token) {
    return Promise.all([this.getUserInfo(token),this.getInitialCards(token)])
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
  getUserInfo(token) { // Запрос на загрузку данных пользователя
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        // 'Authorization': localStorage.getItem('jwt'),
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse)
  }


  // получение серверных карточек
  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        // 'Authorization': localStorage.getItem('jwt'),
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse)
  }

  //установка данных профиля
  patchUserProfile(data, token) {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: {
          // 'Authorization': localStorage.getItem('jwt'),
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._handleResponse)
  }


  // смена аватары
  patchAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`,  {
      method: 'PATCH',
      headers: {
        // 'Authorization': localStorage.getItem('jwt'),
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar.avatar
      })
    })
      .then(this._handleResponse)
  }

 postUserCard(item, token) {
  return fetch(`${this._baseUrl}/cards`,  {
    method: 'POST',
    headers: {
      // 'Authorization': localStorage.getItem('jwt'),
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
    .then(this._handleResponse)
  }

// START DANGERZONE

  putLike({cardId}, token) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
      // 'Authorization': localStorage.getItem('jwt'),
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    })
      .then((res) => this._handleResponse(res));
  };




  // снятие лаека
  deleteLike({cardId}, token) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        // 'Authorization': localStorage.getItem('jwt'),
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      }
    )
      .then(this._handleResponse)
  }

  // удалить карточку
  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`,  {
      method: 'DELETE',
      headers: {
        // 'Authorization': localStorage.getItem('jwt'),
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
      .then(this._handleResponse)
  }

}


export const api = new Api({
  // baseUrl:'https://mesto.nomoreparties.co/v1/cohort-14',
  // baseUrl:'http://api.sealkindom.students.nomoreparties.xyz',
  // baseUrl:'http://localhost:3000'
  baseUrl: `${window.location.protocol}${process.env.API_URL || '//localhost:3000'}`
});
