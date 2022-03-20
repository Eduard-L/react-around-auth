import { PopupWithForm } from "./PopupWithForm"
import { useState, useContext, useEffect } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"
import Popup from "./Popup"



export function EditProfilePopup({ isOpen, onClose, onUpdateUser, isFormLoading }) {
    const userInfo = useContext(CurrentUserContext)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setName(userInfo.name);
        setDescription(userInfo.about);
    }, [userInfo, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            description,
        });

    }

    return (
        <Popup isOpen={isOpen}
            name="edit-profile"
            onClose={onClose}
            children >

            <PopupWithForm


                title="Edit Profile"
                onClose={onClose}
                buttonText={`${isFormLoading ? "Loading..." : "Save"}`}
                onSubmit={handleSubmit}
                isFormLoading={isFormLoading}

            >

                <input
                    type="text"
                    id="input_type_name"
                    className="popup__input popup__input_type_name"
                    name="user_name"
                    minLength="2"
                    maxLength="40"
                    placeholder="Enter Your Name"
                    required
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                />
                <span id="input_type_name-error" className="popup__error"></span>

                <input
                    type="text"
                    id="input_type_description"
                    className="popup__input popup__input_type_description"
                    name="job"
                    minLength="2"
                    maxLength="200"
                    placeholder="Enter Your Job"
                    required
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <span id="input_type_description-error" className="popup__error"></span>


            </PopupWithForm>
        </Popup>
    )
}