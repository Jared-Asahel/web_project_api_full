import buttonClose from "../../../../imagenes/CloseIcon.png";

export default function Popup(props) {
  const { title, children, onClose, image } = props;
  return (
    <div className="popup">
      <div
        className={`popup__container ${!title ? "popup__container-image" : ""}`}
      >
        <img
          src={buttonClose}
          alt="Boton cerrar popup"
          id="closePopupCards"
          className="popup__button"
          onClick={onClose}
        />
        {image}
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
