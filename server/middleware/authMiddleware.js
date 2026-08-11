import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Please sign in first." });
  }

  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    next();
  } catch {
    res.clearCookie("token");
    return res
      .status(401)
      .json({ message: "Your session has expired. Please sign in again." });
  }
}