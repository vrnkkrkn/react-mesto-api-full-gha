import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            userName: name,
            activity: description,
        });
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name={'popup-edit'}
            textButton={onLoading ? `Сохранение` : `Сохранить`}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                id="name"
                placeholder="Введите имя"
                name="userName"
                className="form__item form__item_el_name"
                minLength={2}
                maxLength={40}
                required
                value={name ?? ''}
                onChange={e => setName(e.target.value)}
            />
            <span className="form__item-error" id="name-error" />
            <input
                type="text"
                id="activity"
                placeholder="Расскажите о себе"
                name="activity"
                className="form__item form__item_el_activity"
                minLength={2}
                maxLength={200}
                required
                value={description ?? ''}
                onChange={e => setDescription(e.target.value)}

            />
            <span className="form__item-error" id="activity-error" />
        </PopupWithForm>
    )
}