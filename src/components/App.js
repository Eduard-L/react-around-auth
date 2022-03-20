
import { Header } from './Header';
import { Main } from './Main';
import { ImagePopup } from "./ImagePopup";
import { DeleteCardPopup } from './DeleteCardPopup';
import { Footer } from './Footer';
import '../index.css';
import { useState, useEffect } from 'react';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup'
import { AddPlacePopup } from './AddPlacePopup'
import { Register } from './Register';
import { Login } from './Login'
// import FormValidator from '../utils/FormValidator';
// import { pageSettings } from '../utils/constants';
import Popup from './Popup';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import * as auth from '../utils/auth'
import { PopupWithMessage } from './PopupWithMessage';
import logoSuccessMessageSrc from '../images/Y.svg'
import logoFailedMessgaeSrc from '../images/X.svg'


function App() {
  const navigate = useNavigate();
  // states

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopupIsOpen, setIsImagePopupIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
  const [cardForDelete, setCardForDelete] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFailedMessageOpen, setIsFailedMessageOpen] = useState(false)
  const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)

  // Validators
  // 
  // useEffect(() => {
  //   const addCardForm = document.querySelector(".popup_type_add-card").querySelector('.popup__form');
  //   const addCardFormValidator = new FormValidator(pageSettings, addCardForm);
  //   const editProfileForm = document.querySelector(".popup_type_edit-profile").querySelector('.popup__form');
  //   const EditProfileFormValidator = new FormValidator(pageSettings, editProfileForm);
  //   const editProfilePicForm = document.querySelector('.popup_type_edit-profile-img').querySelector('.popup__form')
  //   // const EditProfilePicFormValidator = new FormValidator(pageSettings, editProfilePicForm);
  //   const forms = document.forms;


  //   addCardFormValidator.enableValidation();
  //   EditProfileFormValidator.enableValidation();
  //   // EditProfilePicFormValidator.enableValidation()


  // }, [])

  // // useEffect(() => {
  // //   const editProfileForm = document.querySelector(".popup_type_edit-profile").querySelector('.popup__form');
  // //   const EditProfileFormValidator = new FormValidator(pageSettings, editProfileForm);

  // //   if (isEditProfilePopupOpen) {
  // //     EditProfileFormValidator.resetValidation();
  // //   }
  // // }, [isEditProfilePopupOpen])

  // useEffect(() => {

  //   const editProfilePicForm = document.querySelector('.popup_type_edit-profile-img').querySelector('.popup__form')
  //   const EditProfilePicFormValidator = new FormValidator(pageSettings, editProfilePicForm);

  //   if (isEditAvatarPopupOpen) {
  //     EditProfilePicFormValidator.resetValidation();
  //   }

  // }, [isEditAvatarPopupOpen])

  // useEffect(() => {
  //   const addCardForm = document.querySelector(".popup_type_add-card").querySelector('.popup__form');
  //   const addCardFormValidator = new FormValidator(pageSettings, addCardForm);
  //   if (isAddPlacePopupOpen) {
  //     addCardFormValidator.resetValidation();
  //   }
  // }, [isAddPlacePopupOpen])


  function handleRegisterForm() {

    setIsRegisterOpen(true)
    setIsLoginOpen(false)
    setEmail('')
    setPassword('')

  }
  function handleLoginInForm() {

    setIsRegisterOpen(false)
    setIsLoginOpen(true)
    setEmail('')
    setPassword('')


  }
  function handleLogOut() {
    localStorage.removeItem('jwt');
    handleLoginInForm();
    setIsLoggedIn(false)
  }

  function closeRegisterAndLoginForms() {
    setIsRegisterOpen(false);
    setIsLoginOpen(false)
  }



  async function handleDeleteCard(card) {
    const deletedCard = card;
    try {
      setIsFormLoading(true)
      const deleteCardResponse = await api.deleteCard(card._id)
      if (deleteCardResponse) {

        setCards((cards) => cards.filter((c) => c._id !== deletedCard._id))
        setIsDeleteCardPopupOpen(false)
        setCardForDelete({})

      }
    }
    catch (e) {
      console.log('check your error', e);
      alert("something went wrong")
    }
    finally {
      setIsFormLoading(false)
    }

  }

  async function handleCardLike(card) {

    // Check one more time if this card was already liked
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    try {
      const updatedCard = await api.changeLikeCardStatus(card._id, !isLiked);
      if (updatedCard) {

        setCards((cards) => cards.map((oldCard) => oldCard._id === card._id ? updatedCard : oldCard))

      }

    }
    catch (e) {
      console.log('check your error', e);
      alert("something went wrong")
    }


  }


  useEffect(() => {

    (async function () { //  the call back shouldnt be async --> react methods are sync 
      setisLoading(true)
      try {
        const cardsData = await api.getInitialCards();
        if (cardsData) {

          setCards(cardsData)

        }
      }
      catch (error) {

        console.log('check your error', error);
        alert("something went wrong")


      }
      finally {
        setisLoading(false);
      }

    })();


  }, [])
  useEffect(() => {
    (async function () {
      try {

        const userInfo = await api.getUserData();
        if (userInfo) {
          setCurrentUser(userInfo)


        }

      }
      catch (e) {
        console.log('error when updating userInfo', e);
        alert("something went wrong with updating user info")
      }

    })();


  }, [])

  async function handleUpdateUser({ name, description }) {

    try {
      setIsFormLoading(true)
      const updatedUserInfo = await api.updatingProfileInfo(name, description)

      if (updatedUserInfo) {

        setCurrentUser(updatedUserInfo)

        closeAllPopups();
      }

    }
    catch (e) {
      console.log('something went wrong with updating user info', e);
      alert('something went wrong with updating user info')
      setisLoading(true)
    }
    finally {
      setIsFormLoading(false)
    }




  }

  async function handleUpadeAvatar({ avatar }) {
    try {
      setIsFormLoading(true)
      const updateAvatar = await api.updatingProfileImg(avatar)
      if (updateAvatar) {
        setCurrentUser({ ...currentUser, avatar })
        closeAllPopups();

      }
    }
    catch (e) {
      console.log('something went wrong with your avatar updating', e)
      alert('something went wrong with your avatar updating');
    }
    finally {
      setIsFormLoading(false)
    }


  }
  async function handleAddPlaceSubmit(name, link) {

    try {
      setIsFormLoading(true)
      const newCard = await api.uploadCard(name, link)
      if (newCard) {
        setCards([newCard, ...cards])
        console.log('newCard was added')
        closeAllPopups();

      }
    }
    catch (e) {
      console.log('something went wrong with adding a card', e)
      alert('something went wrong with adding a card')
    }

    finally {
      setIsFormLoading(false)
    }

  }


  function closeAllPopups() {
    setIsDeleteCardPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupIsOpen(false)
    setIsFailedMessageOpen(false)
    setIsSuccessMessageOpen(false)

    // setTimeout(() => { setSelectedCard({}) }, 2000) //prevent the updating the state before the popup is hidden (caused by time of the transition)

  }

  function handleTrashIconClick() {
    setIsDeleteCardPopupOpen(true)
  }

  function handleAddPlaceClick() {

    setIsAddPlacePopupOpen(true)



  }

  function handleEditProfileClick() {

    setIsEditProfilePopupOpen(true)


  }

  function handleEditAvatarClick() {

    setIsEditAvatarPopupOpen(true)


  }

  function handleCardClick(props) {

    setSelectedCard(props)
    setIsImagePopupIsOpen(true)

  }

  async function handleSubmitUserRegistration(e) {

    e.preventDefault();
    try {
      if (!email || !password) {
        alert('something went wrong with the server while the registartion')
        throw new Error('your info is not valid, please try again')
      }
      const newUser = await auth.register(email, password)
      if (newUser) {
        console.log(newUser);
        setPassword('')
        setEmail('')
        setIsSuccessMessageOpen(true);
        navigate('/signin');
        handleLoginInForm();

      }
      else {
        setPassword('')
        setEmail('')
        setIsFailedMessageOpen(true);
      }
    }
    catch (e) {
      console.log('something went wrong with backend', e)
      alert('something went wrong with the server while the registartion')
    }
  }

  async function handleLogInSubmit(e) {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert('please type valid data');
        throw new Error('please type valid data')

      }
      const resWithToken = await auth.logIn(email, password);
      if (resWithToken.token) {
        console.log(resWithToken)
        setIsLoginOpen(false);
        setIsLoggedIn(true);
        navigate('/')
        setIsSuccessMessageOpen(true);
        localStorage.setItem('jwt', resWithToken.token)
      }
      else {
        setIsFailedMessageOpen(true)
        setEmail('');
        setPassword('');

      }
    }
    catch (e) {
      console.log('something went wrong with backend', e)
      alert('something went wrong with the server', e)
    }

  }
  useEffect(() => {

    (async function checkUsersTokenValidity() {
      try {
        const jwt = localStorage.getItem('jwt')
        if (!jwt) {
          console.log('the token is not valid')
          return
        }
        const res = await auth.checkingTokenValidity(jwt);
        if (res) {
          console.log(res);
          closeRegisterAndLoginForms();
          setIsLoggedIn(true);
          setEmail(res.data.email)
          navigate('/')

        }
        else {
          setIsLoggedIn(false)
        }
      }
      catch (e) {
        console.log('something went wrong with checking the token', e)
      }
    })();
  }, [])


  return (

    <div className="page-wrapper">
      <Header isLoggedIn={isLoggedIn}
        isRegisterOpen={isRegisterOpen}
        isLoginOpen={isLoginOpen}
        handleRegisterForm={handleRegisterForm}
        handleLoginInForm={handleLoginInForm}
        email={email}
        handleLogOut={handleLogOut}
        isBurgerMenuOpen={isBurgerMenuOpen}
        setIsBurgerMenuOpen={setIsBurgerMenuOpen}
      />

      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path='/signup'
            isOpen={isRegisterOpen}
            element={
              <Register
                isLoggedIn={isLoggedIn}
                isRegisterOpen={isRegisterOpen}
                isLoginOpen={isLoginOpen}
                handleLoginInForm={handleLoginInForm}
                handleSubmitUserRegistration={handleSubmitUserRegistration}
                password={password}
                email={email}
                setEmail={setEmail}
                setPassword={setPassword}
                handleRegisterForm={handleRegisterForm}
                title='Sign up'
                btnText='Sign up'
              />}
          />

          <Route path='/signin' element={
            <Login
              handleLoginInForm={handleLoginInForm}
              handleLogInSubmit={handleLogInSubmit}
              handleRegisterForm={handleRegisterForm}
              password={password}
              email={email}
              setEmail={setEmail}
              setPassword={setPassword}
              title='Log in'
              btnText='Log in'
            />}
          />

          <Route path='/' element={<ProtectedRoute isLoggedIn={isLoggedIn} component={Main}

            onAddPlaceClick={handleAddPlaceClick}
            onEditProfileClick={handleEditProfileClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            isLoading={isLoading}
            onCardLike={handleCardLike}
            setCardForDelete={setCardForDelete}
            onCardIconClick={handleTrashIconClick}

          />}>

          </Route>
          <Route path='*' element={<Navigate to='/signin' />} />

        </Routes>
        <Popup onClose={closeAllPopups} isOpen={isImagePopupIsOpen} isImagePopupIsOpen={isImagePopupIsOpen} name="zoom-image" children>
          <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
        </Popup>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isFormLoading={isFormLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpadeAvatar}
          isFormLoading={isFormLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleAddPlaceSubmit}
          isFormLoading={isFormLoading}
        />

        <DeleteCardPopup
          onClose={closeAllPopups}
          name="delete-card"
          isOpen={isDeleteCardPopupOpen}
          cardForDelete={cardForDelete}
          handleDeleteCard={handleDeleteCard}
          isFormLoading={isFormLoading}
        />
        <PopupWithMessage
          isOpen={isSuccessMessageOpen}
          onClose={closeAllPopups}
          name='message_success'
          text='Success! You have now been registered.'
          imgSrc={logoSuccessMessageSrc}
        />

        <PopupWithMessage
          isOpen={isFailedMessageOpen}
          onClose={closeAllPopups}
          name='message_failed'
          text='Oops, something went wrong! Please try again.'
          imgSrc={logoFailedMessgaeSrc}
        />

      </CurrentUserContext.Provider>

      {isLoggedIn && <Footer />}

    </div>


  )
}

export default App

