import logo from '../images/logo.svg';
import { Link, Routes, Route } from 'react-router-dom';

export default function Header({ email, onClick }) {

  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип Место Россия"
        className="header__logo"
      />
      <Routes>
        <Route
          path='/sign-in'
          element={<Link to='/sign-up' className="header__link">Регистрация</Link>}
        />
        <Route
          path='/sign-up'
          element={<Link to='/sign-in' className="header__link">Войти</Link>}
        />
        <Route
          path='/'
          element={
            <div className="header__menu">
              <p className="header__email">{email}</p>
              <p className="header__exit" onClick={onClick}>Выйти</p>
            </div>
          }
        />
      </Routes>
    </header>
  )
}