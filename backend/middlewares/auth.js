const jwt = require("jsonwebtoken");
const ForbiddenError = require("../errors/forbidden");

const { JWT_SECRET = "some-secret-key" } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new ForbiddenError("Acceso denegado: token no proporcionado."));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(
      new ForbiddenError("Acceso denegado: token inválido o expirado.")
    );
  }

  req.user = payload;
  return next();
};
