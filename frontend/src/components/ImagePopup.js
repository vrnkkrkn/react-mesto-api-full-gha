export default function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_type_image ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__container-image">
        <button type="button" className="popup__close-icon" onClick={onClose} />
        <img className="popup__picture" src={card.link} alt={card.name} />
        <h2 className="popup__text">{card.name}</h2>
      </div>
    </section>
  )
}