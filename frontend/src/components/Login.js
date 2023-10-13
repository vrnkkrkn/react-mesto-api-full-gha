import React, { useState } from 'react';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (evt) => {
        setEmail(evt.target.value);
    }

    const handleChangePassword = (evt) => {
        setPassword(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onLogin(email, password);
    }

    return (
        <section className="authorization authorization_type_login">
            <h2 className="authorization__title">Вход</h2>
            <form
                className="authorization__form"
                onSubmit={handleSubmit}
            >
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    className="authorization__input"
                    value={email}
                    onChange={handleChangeEmail}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    id="password"
                    className="authorization__input"
                    value={password}
                    onChange={handleChangePassword}
                />
                <button className="authorization__button" type="submit">Войти</button>
            </form>
        </section>
    )
}