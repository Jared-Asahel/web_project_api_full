import logo from "../../imagenes/Vector.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { removeToken } from "../../utils/token";
import buttonClose from "../../imagenes/CloseIcon.png";

const Header = ({ link, email }) => {
  const navigate = useNavigate();
  const { setIsLoggedIn, userData } = useContext(CurrentUserContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleResize = () => {
    const mobile = window.innerWidth <= 550;
    setIsMobile(mobile);
    if (!mobile) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const singOut = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Popup del menú móvil */}
      {isMobile && isMobileMenuOpen && email === "email" && (
        <div className="header__popup">
          <p className="header__email ">{userData.email}</p>
          {link === "close" && (
            <button className="header__button" onClick={singOut}>
              Cerrar sesión
            </button>
          )}
          <div className="header__line"></div>
        </div>
      )}

      <header className="header">
        <div className="header__content">
          <img src={logo} alt="logotipo" className="header__logo" />

          <div className="header__content-links">
            {isMobile ? (
              email === "email" && (
                <button className="header__button" onClick={toggleMobileMenu}>
                  {isMobileMenuOpen ? (
                    <img
                      src={buttonClose}
                      alt="Cerrar menú"
                      className="header__button-close"
                    />
                  ) : (
                    <div className="header__button-content">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              )
            ) : (
              <>
                {email === "email" && (
                  <strong className="header__email">{userData.email}</strong>
                )}
                {link === "register" && (
                  <Link className="header__link" to="/signup">
                    Regístrate
                  </Link>
                )}
                {link === "login" && (
                  <Link className="header__link" to="/signin">
                    Inicia sesión
                  </Link>
                )}
                {link === "close" && (
                  <button className="header__button" onClick={singOut}>
                    Cerrar sesión
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="header__line"></div>
      </header>
    </>
  );
};

export default Header;
