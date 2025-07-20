// Importación de imágenes y componentes
import buttonPerfil from "../../imagenes/Vector.svg";
import buttonAdd from "../../imagenes/VectorAddCard.png";
import Card from "./components/Card/Card";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/NewCard/NewCard";
import EditProfile from "./components/Popup/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar";
import { api } from "../../utils/api";

import { useContext, useState, useEffect } from "react";

// Importación del contexto del usuario
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Componente Main que muestra el perfil y las tarjetas
const Main = () => {
  // Obtener la información del usuario desde el contexto
  const { currentUser, setCurrentUser, handleUpdateAvatar, handleUpdateUser } =
    useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

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
    try {
      const deletedCard = await api.deleteCard(card._id); // si hay error aquí, se va al catch
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== deletedCard._id)
      );
    } catch (error) {
      if (error.status === 403) {
        alert("No tienes permiso para eliminar esta tarjeta.");
      } else {
        console.error("Error al eliminar la tarjeta:", error);
      }
    }
  }

  function handleAddCard(data) {
    api
      .createCard(data)
      .then((newData) => {
        setCards([newData, ...cards]);
      })
      .catch((err) => console.error(err));
  }

  // Estado para manejar el popup activo
  const [popup, setPopup] = useState(null);

  // Función para cerrar cualquier popup
  const closePopup = () => setPopup(null);

  // Configuración del popup para editar avatar
  const popupEditAvatar = {
    title: "Cambiar foto de perfil",
    children: (
      <EditAvatar onClose={closePopup} onUpdateAvatar={handleUpdateAvatar} />
    ),
  };

  // Configuración del popup para editar perfil
  const popupEditPerfil = {
    title: "Editar Perfil",
    children: (
      <EditProfile onClose={closePopup} onUpdateUser={handleUpdateUser} />
    ),
  };

  // Configuración del popup para añadir una nueva tarjeta
  const popupAddCard = {
    title: "Nuevo Lugar",
    children: <NewCard onClose={closePopup} onAddCard={handleAddCard} />,
  };

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

  return (
    <main className="content">
      {/* Sección del perfil */}
      <section className="profile">
        <div className="profile__content">
          {/* Imagen de perfil y botón para editar avatar */}
          <div className="profile__image-content">
            <img
              src={currentUser.avatar}
              alt="Foto de perfil"
              className="profile__image"
              id="perfilImage"
            />
            <img
              src={buttonPerfil}
              onClick={() => setPopup(popupEditAvatar)}
              alt=""
              className="profile__image-pencil"
            />
          </div>

          {/* Información del perfil */}
          <div className="profile__info">
            <div className="profile__info-2">
              {/* Nombre del usuario */}
              <h2 className="profile__info-2 profile__name" id="name1">
                {currentUser.name}
              </h2>

              {/* Botón para editar perfil */}
              <img
                src={buttonPerfil}
                alt="Boton cerrar popup"
                className="profile__button-2"
                id="openpopup"
                onClick={() => {
                  setPopup(popupEditPerfil);
                }}
              />
            </div>

            {/* Descripción (about) del usuario */}
            <h3 className="profile__name-2" id="name2">
              {currentUser.about}
            </h3>
          </div>
        </div>

        {/* Botón para añadir nueva tarjeta */}
        <button
          className="profile__button"
          onClick={() => {
            setPopup(popupAddCard);
          }}
        >
          <img
            src={buttonAdd}
            alt="Vector del boton"
            className="profile__button-img"
            id="openPopupCards"
          />
        </button>
      </section>

      {/* Sección de tarjetas */}
      <section className="elements" id="elements">
        {/* Renderizar las tarjetas usando map */}
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onClick={(popupImage) => {
              setPopup(popupImage);
            }}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>
      {/* Popup dinámico */}
      {popup && (
        <Popup onClose={() => setPopup(null)} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
};

export default Main;
