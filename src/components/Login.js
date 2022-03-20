import { Link } from "react-router-dom";
import { useEffect } from "react";

export function Login({ handleLoginInForm, title, btnText, handleRegisterForm, password, email, setEmail, setPassword, handleLogInSubmit }) {

    useEffect(() => {
        handleLoginInForm();
    }, [])

    return (
        <div className="register">
            <h2 className="register__title">{title}</h2>
            <form className="register__form" onSubmit={handleLogInSubmit}>
                <input type='email' placeholder="Email" className="register__input" required value={email || ''} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder="Password" className="register__input" required value={password || ''} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="register__button">{btnText}</button>


                <Link to='/signup' onClick={handleRegisterForm} className="register__link">Not a member yet? Sign up here!</Link>

            </form>
        </div >
    )
}