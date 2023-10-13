import React, { useState } from 'react';
import { Link } from "react-router-dom";


export default function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password);
    }

    return (
        <section className="authorization authorization_type_register">
            <h2 className="authorization__title">Регистрация</h2>
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
                <button type="submit" className="authorization__button">Зарегистрироваться</button>
                <Link to='/sign-in' className="authorization__text">Уже зарегистрированы? Войти</Link>
            </form>
        </section>
    )
}