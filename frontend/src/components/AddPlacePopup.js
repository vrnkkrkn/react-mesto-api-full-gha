import { useEffect, useState } from "react"
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setTitle('');
        setLink('');
    }, [isOpen]);

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            title: title,
            link: link,
        });
    }

    return (

        <PopupWithForm
            title='Новое место'
            name={'popup-add'}
            textButton={onLoading ? `Сохранение` : `Сохранить`}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                id="title"
                placeholder="Название"
                name="title"
                className="form__item form__item_el_title"
                minLength={2}
                maxLength={30}
                required
                value={title ?? ''}
                onChange={e => setTitle(e.target.value)}
            />
            <span className="form__item-error" id="title-error" />
            <input
                type="url"
                id="link"
                placeholder="Ссылка на картинку"
                name="link"
                className="form__item form__item_el_link"
                required
                value={link ?? ''}
                onChange={e => setLink(e.target.value)}
            />
            <span className="form__item-error" id="link-error" />
        </PopupWithForm>
    )
}