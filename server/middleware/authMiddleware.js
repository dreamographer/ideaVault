const CLIENT_URL = process.env.CLIENT_URL;
import jwt from "jsonwebtoken";
export function isAuthenticated(req, res, next) {
  const token = req.cookies.jwt;
  console.log("token in host", token);
  const data = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  req.tokenData = data;
  if (!token) {
    return res.status(401).send();
  }
  return next();
}
