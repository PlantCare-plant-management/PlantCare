async function errorHandler(error, req, res, next) {
  console.log(error);
  switch (error.name) {
    case "ZodError":
      let message = error.errors.map((err) => err.message);
      res.status(400).json({
        message: message[0],
      });
      break;
    case "ValidationError":
    case "MongoServerError":
      const mongoMessage = error.errors
        ? error.errors.map((el) => el.message)
        : [error.message];
      res.status(400).json({
        message: mongoMessage[0],
      });
      break;
    case "AUTH_NOT_VALID":
      res.status(401).json({
        message: "Invalid email or password. Please try again",
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({
        message: "Invalid token: Please log in again",
      });
      break;
    case "UNAUTHORIZED":
      res.status(401).json({
        message: "Access denied: Please log in first",
      });
      break;
    case "FORBIDDEN":
      res.status(403).json({
        message:
          "Access denied: You do not have permission to access this resource",
      });
      break;
    default:
      res.status(500).json({
        message: "Internal Server Error",
      });
      break;
  }
}

module.exports = errorHandler;
