import Popup from "./Popup"
function ImagePopup({ selectedCard, onClose, name, isOpen }) {
    return (


        <Popup name={name} isOpen={isOpen} onClose={onClose}>
            <div className="popup__content popup__content-wrapper">
                <img src={selectedCard.link} alt="image preview" className="popup__image" />
                <figure className="popup__figure">{`${selectedCard.name}`}</figure>


                <button
                    className="popup__close-button popup__close-button_type_zoom-image"
                    type="button"
                    onClick={onClose}
                >
                </button>

            </div>
        </Popup>




    )

}
export { ImagePopup }