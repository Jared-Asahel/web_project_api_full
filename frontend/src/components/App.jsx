import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Confirmation from "../imagenes/Paloma.png";
import Error from "../imagenes/Equis.png";
import Popup from "./Main/components/Popup/Popup";
import { useState, useEffect } from "react";
import { api } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import * as tokenApi from "../utils/tokenApi";
import { setToken, getToken } from "../utils/token";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "" });
  const location = useLocation();
  const [popup, setPopup] = useState(null);
  const closePopup = () => setPopup(null);

  const navigate = useNavigate();

  const handleRegistration = ({ password, email }) => {
    auth
      .register(email, password)
      .then(() => {
        setPopup({
          title: "¡Correcto! Ya estás registrado.",
          image: <img src={Confirmation} className="register__icon" />,
        });
        navigate("signin");
      })
      .catch(() => {
        setPopup({
          title: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
          image: <img src={Error} className="register__icon" />,
        });
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setUserData({ email: data.email }); // guardar los datos de usuario en el estado
          setIsLoggedIn(true);
          setToken(data.token);

          const redirectPath = location.state?.from?.pathname || "/home";
          navigate(redirectPath);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    // Llama a la función, pasándole el JWT.
    tokenApi
      .getUserInfo(jwt)
      .then((data) => {
        // si la respuesta es exitosa, inicia la sesión del usuario, guarda sus
        // datos en el estado y lo dirige a /ducks.
        setIsLoggedIn(true);
        setUserData({ email: data.email });
      })
      .catch(console.error);
  }, []);

  //---------------------------------------------------------------------------

  useEffect(() => {
    api
      .getUserInformation()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.error("Error al obtener la información del usuario:", err);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.error("Error al cargar las tarjetas:", err);
      });
  }, []);

  const handleUpdateUser = (data) => {
    api
      .updateUserInformation(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateUserImage(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch((err) => console.error(err));
  };

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    await api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => console.error("Error al eliminar la tarjeta:", error));
  }

  function handleAddCard(data) {
    api
      .createCard(data)
      .then((newData) => {
        setCards([newData, ...cards]);
      })
      .catch((err) => console.error(err));
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        setIsLoggedIn,
        isLoggedIn,
        userData,
      }}
    >
      <Routes>
        <Route
          path="/signin"
          element={
            <ProtectedRoute anonymous>
              <Login handleLogin={handleLogin} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute anonymous>
              <Register handleRegistration={handleRegistration} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <div className="page">
                <Header
                  userData={userData}
                  link="close"
                  email="email"
                  setIsLoggedIn={setIsLoggedIn}
                />
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onAddCard={handleAddCard}
                  onUpdateUser={handleUpdateUser}
                  onUpdateAvatar={handleUpdateAvatar}
                />
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
      {popup && (
        <Popup
          onClose={closePopup}
          title={popup.title}
          image={popup.image}
        ></Popup>
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
