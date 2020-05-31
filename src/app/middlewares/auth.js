const jwt = require("jsonwebtoken");
const { secret } = require("../../config/jwt");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.json({ error: "Token não enviado" });

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await (jwt.verify)(token, secret);

    req.userId = decoded.id;

    return next;
  } catch (error) {}
};
