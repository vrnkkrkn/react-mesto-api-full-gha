class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    /** проверка, всё ли в порядке с ответом от сервера */
    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    /** загрузка карточек с сервера */
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        })
            .then(this._checkRes);
    }

    /** загрузка информации о пользователе с сервера */
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        })
            .then(this._checkRes);
    }

    /** редактирование профиля */
    setUserInfo(info) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                name: info.userName,
                about: info.activity
            })
        })
            .then(this._checkRes);
    }

    /** добавление новой карточки */
    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                name: data.title,
                link: data.link
            })
        })
            .then(this._checkRes);
    }

    /** удаление карточки */
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(this._checkRes);
    }

    /** постановка  лайка */
    putLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        })
            .then(this._checkRes);
    }

    /** снятие лайка */
    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        })
            .then(this._checkRes);
    }

    /** обновление аватара пользователя */
    setAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkRes);
    }
}

const api = new Api({
    baseUrl: 'https://api.mesto.vrnkkrkn.nomoredomainsrocks.ru',
});

export default api;