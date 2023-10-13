export default function PopupWithForm({ title, name, textButton, children, isOpen, onClose, onSubmit }) {

  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-icon" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className="form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__button">
            {textButton}
          </button>
        </form>
      </div>
    </section>
  )
}