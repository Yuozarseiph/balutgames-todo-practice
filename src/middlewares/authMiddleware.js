// Step 1
const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const auth = req.headers.authorization;
  const [scheme, token] = auth ? auth.split(" ") : [];
  if (scheme !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { authenticateJWT };
