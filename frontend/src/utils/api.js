class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
      },
    }).then((res) => res.json());
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "GET",
      headers: {
        ...this._headers,
      },
    }).then((res) => res.json());
  }
  updateUserInformation(body) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  createCard(body) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  likeCard(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        ...this._headers,
      },
    }).then((res) => res.json());
  }
  /* 
  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        ...this._headers,
      },
    }).then((res) => res.json());
  } */

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
      },
    }).then((res) => res.json());
  }

  updateUserImage(body) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
}

export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "8811d42f-5d91-43ce-b8db-ad49242612f2",
    "Content-Type": "application/json",
  },
});
