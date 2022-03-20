import Popup from "./Popup";
import { PopupWithForm } from "./PopupWithForm";
export function DeleteCardPopup({ onClose, name, isOpen, handleDeleteCard, cardForDelete, isFormLoading }) {

    function handleSubmitDeleteCard(e) {
        e.preventDefault();
        handleDeleteCard(cardForDelete);
    }

    return (
        <Popup onClose={onClose} name={name} isOpen={isOpen} >
            <PopupWithForm


                title="Are you sure?"
                onClose={onClose}
                buttonText={`${isFormLoading ? "Deleting Card..." : "Save"}`}
                onSubmit={handleSubmitDeleteCard}
                isFormLoading={isFormLoading}
            >

            </PopupWithForm>
        </Popup>


    )
}