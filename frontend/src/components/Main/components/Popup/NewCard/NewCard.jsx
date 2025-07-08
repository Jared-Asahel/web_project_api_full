// Importación de useRef para manejar referencias a los inputs
import { useRef } from "react";

// Componente NewCard para añadir una nueva tarjeta
const NewCard = ({ onClose, onAddCard }) => {
  // Crear referencias para los inputs
  const nameRef = useRef();
  const linkRef = useRef();

  // Maneja el envío del formulario
  function handleSubmit(event) {
    event.preventDefault();

    // Llama a la función onAddCard con los valores actuales de los inputs
    onAddCard({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });

    // Cierra el popup después de añadir la tarjeta
    onClose();
  }

  return (
    // Formulario para añadir nueva tarjeta
    <form id="formCard" onSubmit={handleSubmit}>
      {/* Input para el título de la tarjeta */}
      <input
        required
        type="text"
        className="popup__input"
        placeholder="Titulo"
        id="Titulo"
        minLength="2"
        maxLength="30"
        name="title"
        ref={nameRef}
      />
      <span className="popup__error" id="Titulo-error"></span>

      {/* Input para el enlace de la imagen */}
      <input
        required
        type="url"
        className="popup__input popup__margin-top"
        placeholder="Enlace de la imagen"
        id="Enlace"
        name="link"
        ref={linkRef}
      />
      <span className="popup__error" id="Enlace-error"></span>

      {/* Botón para enviar el formulario */}
      <button className="popup__button-1" type="submit">
        Guardar
      </button>
    </form>
  );
};

// Exportar el componente
export default NewCard;
