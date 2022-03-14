import React from "react";
import { Route, Redirect, useHistory, Switch } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isImagePopup, setIsImagePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleCardClick = ({ name, link }) => {
    setIsImagePopup(!isImagePopup);
    setSelectedCard({ name, link });
  };

  const onAddPlace = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const onEditProfile = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const onEditAvatar = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopup(false);
  };

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const handleUpdateUser = (name) => {
    api
      .saveUserChanges(name)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (res) => {
    api
      .changedAvatar(res)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .postNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .likedCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .dislikedCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCardList = cards.filter((c) => c._id !== card._id);
        setCards(newCardList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [message, setMessage] = React.useState("");

  const [email, setEmail] = React.useState("");

  const tokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }
    auth
      .checkToken(token)
      .then((res) => {
        setEmail(res.email);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onLogin = (data) => {
    return auth
      .authorize(data)
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        setEmail(data.email);
      })
      .catch((err) =>
        setMessage(err.message || "Ошибка, введены неверные данные!")
      );
  };

  const [imageStatus, setImageStatus] = React.useState(false);

  const [popupStatus, setPopupStatus] = React.useState(false);

  function onClose() {
    setPopupStatus(false);
    if (imageStatus) {
      history.push("/sign-in");
    }
  }

  const onRegister = (data) => {
    setPopupStatus(true);
    return auth
      .register(data)
      .then(() => {
        setImageStatus(true);
        setMessage("Вы успешно зарегестрировались!");
      })
      .catch((err) => {
        setImageStatus(false);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      });
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  };

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      tokenCheck();
    }
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (isLoggedIn) {
      history.push("/Mesto_React");
      api.setToken(token)
      Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([data, card]) => {
        setCurrentUser(data);
        setCards(card);
      })
      .catch((err) => console.log(err));
    }
  }, [history, isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userData={email} onLogout={onLogout} />
        <Switch>
          <Route path="/sign-up">
            <Register
              title="Регистрация"
              textButton="Зарегестрироваться"
              setRegisterInfo={onRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Login title="Вход" textButton="Войти" setAuthInfo={onLogin} />
          </Route>
          <ProtectedRoute
            path="/Mesto_React"
            component={Main}
            onLogout={onLogout}
            isLoggedIn={isLoggedIn}
            cards={cards}
            onAddPlace={onAddPlace}
            onEditProfile={onEditProfile}
            onEditAvatar={onEditAvatar}
            handleCardClick={handleCardClick}
            handleSubmitUser={handleUpdateUser}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
          />
          <Route exact path="/">
            {isLoggedIn ? (
              <Redirect to="/Mesto_React" />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>
        </Switch>
        <Footer />
        <ImagePopup
          isOpen={isImagePopup}
          onClose={closeAllPopups}
          name={selectedCard.name}
          link={selectedCard.link}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          handleSubmitUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <InfoTooltip
          isOpen={popupStatus}
          onClose={onClose}
          status={imageStatus}
          textStatus={message}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
