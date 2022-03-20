import { PopupWithForm } from "./PopupWithForm"
import { useRef, useEffect } from "react";
import Popup from "./Popup";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isFormLoading }) {
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.value = ''
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value
        });



    }

    return (

        <PopupWithForm
            isFormLoading={isFormLoading}
            title="Change profile picture"
            buttonText={`${isFormLoading ? "Loading..." : "Save"}`}
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}
            name="edit-profile-img"
        >


            <input
                type="url"
                id="input_type_url_photo"
                className="popup__input popup__input_type_url"
                name="profile-pic__url"
                placeholder="Enter your profile photo URL"
                ref={inputRef}
                defaultValue={''}
                required
            />
            <span id="input_type_url_photo-error " className="popup__error"></span>

        </PopupWithForm>

    )

}
