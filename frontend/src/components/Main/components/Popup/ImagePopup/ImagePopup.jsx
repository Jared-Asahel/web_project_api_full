const ImagePopup = (props) => {
  const { name, link } = props;

  return (
    <>
      <img src={link} alt="" className="popup__image" />
      <p className="popup__paragraph">{name}</p>
    </>
  );
};

export default ImagePopup;
