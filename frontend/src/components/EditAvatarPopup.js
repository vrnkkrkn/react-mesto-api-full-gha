import { useEffect, useRef } from "react"
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {

    const refAvatar = useRef('');

    useEffect(() => {
        refAvatar.current.value = '';
    }, [isOpen]);

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateAvatar({
            avatar: refAvatar.current.value
        });
    }

    return (
        <PopupWithForm
            title='Обновить аватар'
            name={'popup-avatar'}
            textButton={onLoading ? `Сохранение` : `Сохранить`}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                id="avatar"
                placeholder="Ссылка на картинку"
                name="avatar"
                className="form__item form__item_el_avatar-link"
                required
                ref={refAvatar}
            />
            <span className="form__item-error" id="avatar-error" />
        </PopupWithForm>
    )
}