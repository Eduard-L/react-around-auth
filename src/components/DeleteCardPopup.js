
import { PopupWithForm } from "./PopupWithForm";
export function DeleteCardPopup({ onClose, name, isOpen, handleDeleteCard, cardForDelete, isFormLoading }) {

    function handleSubmitDeleteCard(e) {
        e.preventDefault();
        handleDeleteCard(cardForDelete);
    }

    return (

        <PopupWithForm

            name={name}
            title="Are you sure?"
            onClose={onClose}
            buttonText={`${isFormLoading ? "Deleting Card..." : "Save"}`}
            onSubmit={handleSubmitDeleteCard}
            isFormLoading={isFormLoading}
            isOpen={isOpen}
        >

        </PopupWithForm>



    )
}