import Popup from "./Popup"



export function PopupWithMessage({ text, imgSrc, onClose, name, isOpen }) {
    return (
        <Popup name={name} isOpen={isOpen} onClose={onClose}>
            <div className="popup__content">

                <img className="popup__logo" src={imgSrc} all="message__logo" />
                <h2 className="popup__title popup__title_type_message">{text}</h2>
                <button
                    className="popup__close-button popup__close-button_type_message "
                    type="button"
                    onClick={onClose}
                >
                </button>
            </div>
        </Popup>

    )

}