// Importación de imágenes y componentes
import buttonPerfil from "../../imagenes/Vector.svg";
import buttonAdd from "../../imagenes/VectorAddCard.png";
import Card from "./components/Card/Card";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/NewCard/NewCard";
import EditProfile from "./components/Popup/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar";

import { useContext, useState } from "react";

// Importación del contexto del usuario
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Componente Main que muestra el perfil y las tarjetas
const Main = (props) => {
  // Obtener la información del usuario desde el contexto
  const { currentUser } = useContext(CurrentUserContext);

  // Desestructuración de las props recibidas
  const {
    cards,
    onCardLike,
    onCardDelete,
    onAddCard, // Nueva prop para añadir tarjeta
    onUpdateUser, // Nueva prop para actualizar perfil
    onUpdateAvatar, // Nueva prop para actualizar avatar
  } = props;

  // Estado para manejar el popup activo
  const [popup, setPopup] = useState(null);

  // Función para cerrar cualquier popup
  const closePopup = () => setPopup(null);

  // Configuración del popup para editar avatar
  const popupEditAvatar = {
    title: "Cambiar foto de perfil",
    children: (
      <EditAvatar onClose={closePopup} onUpdateAvatar={onUpdateAvatar} />
    ),
  };

  // Configuración del popup para editar perfil
  const popupEditPerfil = {
    title: "Editar Perfil",
    children: <EditProfile onClose={closePopup} onUpdateUser={onUpdateUser} />,
  };

  // Configuración del popup para añadir una nueva tarjeta
  const popupAddCard = {
    title: "Nuevo Lugar",
    children: <NewCard onClose={closePopup} onAddCard={onAddCard} />,
  };

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
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
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
