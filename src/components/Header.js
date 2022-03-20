// isBurgerMenuOpen

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo1.svg';
function Header({ ...props }) {
    useEffect(() => {

        if (props.isBurgerMenuOpen) {
            return
        }
        if (!props.isLoggedIn) {
            return
        }
        const menuContainer = document.querySelector('.header__content-wrapper_is-loggedIn');
        function openMenu() {


            menuContainer.style.display = 'flex'
            props.setIsBurgerMenuOpen(true);

        }

        const burgerButton = document.querySelector('.header__burger-menu');
        burgerButton.addEventListener('click', openMenu)


        return () => {
            burgerButton.removeEventListener('click', openMenu)

        }
    }, [props.isBurgerMenuOpen, props.isLoggedIn])
    useEffect(() => {
        const menuContainer = document.querySelector('.header__content-wrapper_is-loggedIn');

        if (!props.isBurgerMenuOpen) return
        if (!props.isLoggedIn) {
            return
        }

        function closeMenu() {


            menuContainer.style.display = 'none'
            props.setIsBurgerMenuOpen(false);

        }

        const closeMenuButton = document.querySelector('.header__close-button');
        closeMenuButton.addEventListener('click', closeMenu)


        return () => {
            closeMenuButton.removeEventListener('click', closeMenu)

        }
    }, [props.isBurgerMenuOpen, props.isLoggedIn])

    return (

        <header className={props.isLoggedIn ? "header_is-loggedIn" : "header"}>
            <div className={props.isLoggedIn ? 'header__logo-container' : 'header__logo-container_is-loggedOut'}>
                <img src={logo} id="header__logo" alt="pic of logo" className="header__logo" />
                {props.isLoggedIn && <button className={props.isBurgerMenuOpen ? 'header__close-button' : 'header__burger-menu'}></button>}
                {/* <button className='header__close-button'></button> */}
            </div>
            <div className={props.isLoggedIn ? 'header__content-wrapper_is-loggedIn' : 'header__content-wrapper'}>
                {props.isLoggedIn && <p className='header__email '>{props.email}</p>}
                {props.isRegisterOpen && <Link to='/signin' onClick={props.handleLoginInForm} className='header__link'>Log In</Link>}
                {props.isLoginOpen && <Link to='/signup' onClick={props.handleRegisterForm} className='header__link'>Sign Up</Link>}
                {props.isLoggedIn && <Link to='/signin' onClick={props.handleLogOut} className='header__link'>Log Out</Link>}

            </div>

        </header>




    )
}
export { Header }

