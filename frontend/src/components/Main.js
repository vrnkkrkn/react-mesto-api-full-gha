import { useContext } from "react"
import Card from "./Card"
import CurrentUserContext from "../contexts/CurrentUserContext"

export default function Main({ onCards, onEditProfile, onAddPlace, onDelete, onEditAvatar, onCardClick, onCardLike }) {

    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <button type="button" className="profile__icon" onClick={onEditAvatar}>
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
                </button>
                <div className="profile__info">
                    <div className="profile__editing">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={onEditProfile} />
                    </div>
                    <p className="profile__activity">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace} />
            </section>
            <ul className="elements" >
                {onCards.map(element => {
                    return (
                        <li className="element" key={element._id}>
                            <Card card={element} onCardClick={onCardClick} onDelete={onDelete} onCardLike={onCardLike} />
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}