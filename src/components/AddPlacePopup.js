import { useState, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm"
import Popup from "./Popup";
export function AddPlacePopup({ isOpen, onClose, onUpdateCards, isFormLoading }) {

    const [cardName, setCardName] = useState('')
    const [cardLink, setCardLink] = useState('')

    useEffect(() => {
        setCardName('');
        setCardLink('');
    }, [isOpen]);


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateCards(cardName, cardLink)


    }
    return (

        < PopupWithForm
            title="New Place"
            isFormLoading={isFormLoading}
            onSubmit={handleSubmit}
            buttonText={`${isFormLoading ? "Loading..." : "Save"}`}
            onClose={onClose}
            isOpen={isOpen}
            name="add-card"
        >



            <input
                type="text"
                id="input_type_title"
                className="popup__input popup__input_type_title"
                name="title__card"
                placeholder="Title"
                minLength="1"
                maxLength="30"
                required
                value={cardName || ''}
                onChange={(e) => setCardName(e.target.value)}
            />
            <span id="input_type_title-error" className="popup__error"></span>

            <input
                type="url"
                id="input_type_url"
                className="popup__input popup__input_type_url"
                name="image__url"
                placeholder="Image URL"
                required
                value={cardLink || ''}
                onChange={(e) => setCardLink(e.target.value)}
            />
            <span id="input_type_url-error" className="popup__error"></span>



        </PopupWithForm>

    )

}