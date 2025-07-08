import Header from "../Header/Header";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ handleLogin }) => {
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
    handleLogin(data);
  };

  return (
    <div className="login">
      <Header link="register" />
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Inicia sesión</h2>
        <input
          required
          className="login__input"
          placeholder="Correo electronico"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          required
          className="login__input"
          placeholder="Contraseña"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <button className="login__button" type="submit">
          Inicia sesión
        </button>
        <Link className="login__paragraph" to="/signup">
          ¿Aún no eres miembro? Regístrate aquí
        </Link>
      </form>
    </div>
  );
};

export default Login;
