export const BASE_URL = 'https://api.mesto.vrnkkrkn.nomoredomainsrocks.ru';

/** проверка, всё ли в порядке с ответом от сервера */
export const checkRes = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

/** запрос для регистрации в сервисе */
export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkRes)
        .catch((err) => console.log(err));
};


/** запрос для авторизации в сервисе */
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkRes)
        .catch((err) => console.log(err));
};

/** запроса для проверки валидности токена и получения email для вставки в шапку сайта */
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(checkRes)
        .catch((err) => console.log(err));
};