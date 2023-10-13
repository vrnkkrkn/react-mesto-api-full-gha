import { useContext } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"

export default function Card({ card, onCardClick, onCardLike, onDelete }) {

    const currentUser = useContext(CurrentUserContext)
    const isOwn = card.owner === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__heart ${isLiked && 'element__heart_active'}`
    );

    function handleCardClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onDelete(card);
    }

    return (
        <div className="element__list">
            <img src={card.link} alt={card.name} className="element__image" onClick={handleCardClick} />
            <div className="element__group">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <p className="element__heart-sum">{card.likes.length}</p>
                </div>
            </div>
            {isOwn && <button type="button" className="element__trash" onClick={handleDeleteClick} />}
        </div>
    )
}