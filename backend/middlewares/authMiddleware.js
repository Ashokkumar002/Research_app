// middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticate = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  console.log("token", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid or expired token", err: err });
    }

    req.user = decoded;
    next(); // Proceed to the next middleware/route handler
  });
};
