import Header from "../Header/Header";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegistration }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <div className="register">
      <Header link="login" />
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__title">Regístrate</h2>
        <input
          required
          className="register__input"
          placeholder="Correo electronico"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          required
          className="register__input"
          placeholder="Contraseña"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <button className="register__button" type="submit">
          Regístrate
        </button>
        <Link className="register__paragraph" to="/signin">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </form>
    </div>
  );
};

export default Register;
