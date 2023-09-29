const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { Token } = require("../models/token");
const { SECRET } = require("./config");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const decodedTokenUser = jwt.verify(request.token, SECRET);

  const dbToken = await Token.findOne({
    attributes: ["id", "userId"],
    where: {
      token: request.token,
    }
  });

  const isTokenValid = !!dbToken;

  if (!decodedTokenUser.id || !isTokenValid) {
    response.status(401).json({ error: "token missing or invalid" });
    return;
  }

  request.user = await User.findByPk(decodedTokenUser.id);

  if (request.user.disabled) {
    response.status(403).json({ error: "user account disabled" });
    return;
  }

  next();
};
//
const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token"
    });
  } else if (error.name === "SequelizeValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
};