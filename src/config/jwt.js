import jwt from "jsonwebtoken";
import dotent from "dotenv";

// đọc file .env
dotent.config();

// create function createToken
export const createToken = (data) => {
  return jwt.sign({ payload: data }, process.env.ACCESS_TOKEN_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
};

const verifyToken = (token) => {
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    return true;
  } catch (error) {
    // không verify được token
    return false;
  }
};

// create middleware token
export const middlewareToken = (req, res, next) => {
  let { token } = req.headers;
  let checkToken = verifyToken(token);
  if (checkToken) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
