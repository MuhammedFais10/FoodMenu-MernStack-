import pkg from "jsonwebtoken";
const { verify } = pkg;
import { UNAUTHORIZED } from "../constants/httpStatus.js";

export default (req, res, next) => {
  // ✅ Read token from cookies first
  const token =
    req.cookies?.jwt || req.cookies?.token || req.headers.access_token;

  if (!token) return res.status(UNAUTHORIZED).send("No token provided");

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(UNAUTHORIZED).send("Invalid token");
  }
};
