// isBurgerMenuOpen

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo1.svg';
function Header({ ...props }) {
    const menuContainer = useRef();
    const menuButton = useRef();


    useEffect(() => {

        if (props.isBurgerMenuOpen) {
            return
        }
        if (!props.isLoggedIn) {
            return
        }

        function openMenu() {

            menuContainer.current.classList.add('is-visible')
            props.setIsBurgerMenuOpen(true);

        }

        if (menuButton) {
            menuButton.current.removeEventListener('click', openMenu)
            menuButton.current.addEventListener('click', openMenu)
        }

    }, [props.isBurgerMenuOpen, props.isLoggedIn, menuButton])
    useEffect(() => {

        if (!props.isBurgerMenuOpen) return
        if (!props.isLoggedIn) {
            return
        }

        function closeMenu() {

            menuContainer.current.classList.remove('is-visible')
            props.setIsBurgerMenuOpen(false);

        }

        if (menuButton) {
            menuButton.current.removeEventListener('click', closeMenu)
            menuButton.current.addEventListener('click', closeMenu)
        }

    }, [props.isBurgerMenuOpen, props.isLoggedIn, menuButton])

    return (

        <header className={props.isLoggedIn ? "header_is-loggedIn" : "header"}>
            <div className={props.isLoggedIn ? 'header__logo-container' : 'header__logo-container_is-loggedOut'}>
                <img src={logo} id="header__logo" alt="pic of logo" className="header__logo" />
                {props.isLoggedIn && <button ref={menuButton} className={props.isBurgerMenuOpen ? 'header__close-button' : 'header__burger-menu'}></button>}
                {/* <button className='header__close-button'></button> */}
            </div>
            <div ref={menuContainer} className={props.isLoggedIn ? 'header__content-wrapper_is-loggedIn' : 'header__content-wrapper'}>
                {props.isLoggedIn && <p className='header__email '>{props.email}</p>}
                {props.isRegisterOpen && <Link to='/signin' onClick={props.handleLoginInForm} className='header__link'>Log In</Link>}
                {props.isLoginOpen && <Link to='/signup' onClick={props.handleRegisterForm} className='header__link'>Sign Up</Link>}
                {props.isLoggedIn && <Link to='/signin' onClick={() => { props.handleLogOut(); props.setIsBurgerMenuOpen(false); }} className='header__link'>Log Out</Link>}

            </div>

        </header>




    )
}
export { Header }

