import { getToken } from "./token";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  // Función para obtener los headers dinámicamente
  _getHeaders() {
    return {
      authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    };
  }

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then((res) => res.json());
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then((res) => res.json());
  }

  updateUserInformation(body) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  createCard(body) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  likeCard(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._getHeaders(),
    }).then((res) => res.json());
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          const error = new Error(err.message);
          error.status = res.status;
          throw error;
        });
      }
      return res.json();
    });
  }

  updateUserImage(body) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
}

// Ya no pasamos headers fijos aquí
export const api = new Api({
  baseUrl: "https://api.webaround.jumpingcrab.com",
});
