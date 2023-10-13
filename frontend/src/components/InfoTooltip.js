import successImage from '../images/success.svg';
import failImage from '../images/fail.svg'

export default function InfoTooltip({ status, isOpen, onClose }) {
    return (
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-icon" onClick={onClose} />
                <img className="popup__image-status" src={`${status ? successImage : failImage}`} alt="Сообщение о статусе регистрации/входа" />
                <h2 className="popup__text-status">{`${status ? "Вы успешно\nзарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</h2>
            </div>
        </section>
    )
}