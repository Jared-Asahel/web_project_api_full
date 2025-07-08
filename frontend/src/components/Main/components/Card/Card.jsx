import RemoveCard from "../../../../imagenes/RemoveCard.png";
import ImagePopup from "../Popup/ImagePopup/ImagePopup";

const Card = (props) => {
  const { card, onClick, onCardLike, onCardDelete } = props;
  const { name, link, isLiked } = card;

  const popupImage = {
    title: "",
    children: <ImagePopup name={name} link={link} />,
  };

  const cardLikeButtonClassName = `elements__heart ${
    isLiked ? "elements__heart_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__group">
      <img
        src={RemoveCard}
        alt=""
        className="elements__remove"
        id="buttonDelete"
        onClick={handleDeleteClick}
      />
      <div>
        <img
          src={link}
          alt="Imagen de carta"
          className="elements__image"
          onClick={() => onClick(popupImage)}
        />
      </div>
      <div className="elements__rectangle">
        <h2 className="elements__paragraph">{name}</h2>
        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
};

export default Card;
