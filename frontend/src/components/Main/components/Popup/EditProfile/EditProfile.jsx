// Importación de hooks useState y useContext
import { useState, useContext } from "react";

// Importación del contexto donde está la info del usuario actual
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

// Componente EditProfile para editar el perfil del usuario
const EditProfile = ({ onClose }) => {
  // Accede al contexto para obtener el usuario actual y la función para actualizarlo
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  // Estado para manejar el nombre y descripción en los inputs
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  // Maneja el cambio en el input del nombre
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Maneja el cambio en el input de la descripción
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    // Llama a la función para actualizar el usuario con los nuevos datos
    handleUpdateUser({ name, about: description });

    // Cierra el popup
    onClose();
  };

  return (
    // Formulario para editar perfil
    <form id="formEditPerfil" onSubmit={handleSubmit}>
      {/* Input para el nombre */}
      <input
        required
        type="text"
        className="popup__input"
        placeholder="Nombre"
        id="nombre"
        minLength="2"
        maxLength="40"
        name="Nombre"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__error" id="nombre-error"></span>

      {/* Input para la descripción */}
      <input
        required
        type="text"
        className="popup__input popup__margin-top"
        placeholder="Acerca de mi"
        id="acercaDeMi"
        minLength="2"
        maxLength="200"
        name="Acerca"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error" id="acercaDeMi-error"></span>

      {/* Botón para guardar los cambios */}
      <button className="popup__button-1" type="submit">
        Guardar
      </button>
    </form>
  );
};

// Exporta el componente
export default EditProfile;
