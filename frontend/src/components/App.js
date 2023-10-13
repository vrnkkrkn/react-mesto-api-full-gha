import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import * as auth from '../utils/auth';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({});
    setIsInfoTooltipPopupOpen(false)
  }
  /** выход */
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c))
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        /** обрабатываем результат*/
        .then(([dataCards, dataProfile]) => {
          setCurrentUser(dataProfile)
          setCards(dataCards);
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [loggedIn])

  function handleUpdateUser(info) {
    setIsLoading(true);
    api.setUserInfo(info)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.setAvatar(avatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  /** регистрация пользователя */
  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setLoggedIn(true);
        setIsInfoTooltipPopupOpen(true);
        setStatus(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((error) => {
        setIsInfoTooltipPopupOpen(true);
        setStatus(false);
        console.log(error);
      })
  }

  /** авторизация пользователя */
  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        /** проверка, есть ли у данных JWT */
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setEmail(email);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        setIsInfoTooltipPopupOpen(true);
        setStatus(false);
        console.log(error);

      });
  }

  /** проверка токена */
  useEffect(() => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // проверим токен
      auth.checkToken(jwt).then((res) => {
        if (res) {
          // авторизуем пользователя
          setLoggedIn(true);
          setEmail(res.email);
          navigate('/', { replace: true })
        }
      })
        .catch((error) => {
          console.log(error)
        });
    } else {
      setLoggedIn(false);
    }
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header
          email={email}
          onClick={handleSignOut}
        />

        <Routes>
          <Route path='/sign-up' element={<Register onRegister={handleRegister} />} />
          <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={setSelectedCard}
                onCards={cards}
                onCardLike={handleCardLike}
                onDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="*" element={loggedIn ? <Navigate to='/' replace /> : <Navigate to='/sign-up' replace />} />
        </Routes>

        <Footer />

        < EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />

        < EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          status={status}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;