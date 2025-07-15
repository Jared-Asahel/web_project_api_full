const mongoose = require("mongoose");
const validator = require("validator");

const urlRegex =
  /^https?:\/\/(www\.)?[\w-]+(\.[\w-]+)+([/\w-._~:/?#[\]@!$&'()*+,;=]*)?#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorador",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (props) => `${props.value} no es una URL valida`,
    },
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Formato de correo electronico no valido",
    },
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
