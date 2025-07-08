// Importación de hooks useContext y useRef
import { useContext, useRef } from "react";

// Importación del contexto donde está la función para actualizar el avatar
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

// Componente EditAvatar para cambiar la foto de perfil
const EditAvatar = ({ onClose }) => {
  // Accede al contexto para obtener la función que actualiza el avatar
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  // Referencia al input de URL del avatar
  const avatarRef = useRef();

  // Maneja el envío del formulario
  function handleSubmit(e) {
    e.preventDefault();

    // Llama a la función para actualizar el avatar usando el valor del input
    handleUpdateAvatar({ avatar: avatarRef.current.value });

    // Cierra el popup
    onClose();
  }

  return (
    // Formulario para editar la imagen de perfil
    <form id="formPerfilImage" onSubmit={handleSubmit}>
      {/* Input para la URL de la imagen del avatar */}
      <input
        required
        type="url"
        className="popup__input"
        placeholder="Enlace de la imagen"
        id="Enlace"
        name="link"
        ref={avatarRef}
      />
      <span className="popup__error" id="Enlace-error"></span>

      {/* Botón para guardar los cambios */}
      <button className="popup__button-1" type="submit">
        si
      </button>
    </form>
  );
};

// Exporta el componente
export default EditAvatar;
