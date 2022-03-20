import { useEffect } from "react";
import { Link } from "react-router-dom";

export function Register({ isLoggedIn, isRegisterOpen, isLogged, title, btnText, handleRegisterForm, handleLoginInForm, email, password, setPassword, setEmail, handleSubmitUserRegistration }) {

    useEffect(() => {


        handleRegisterForm();

    }, [])

    return (
        <div className="register">
            <h2 className="register__title">{title}</h2>
            <form className="register__form" onSubmit={handleSubmitUserRegistration}>
                <input type='email' placeholder="Email" className="register__input" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder="Password" className="register__input" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="register__button">{btnText}</button>
                <Link to='/signin' onClick={handleLoginInForm} className="register__link">Already a member? Log in here</Link>

            </form>
        </div >
    )
}