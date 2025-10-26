import jwt from "jsonwebtoken";
import HttpError from "../utils/HttpError.js";

const { JWT_SECRET } = process.env;

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw HttpError(401, "Authorization header missing or malformed");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    next(HttpError(401, "Unauthorized: invalid or expired token"));
  }
};
