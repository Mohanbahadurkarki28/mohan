const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      return res.sendStatus(403); 
    }

    req.user = user;
    next();
  });
};

module.exports = authenticate;
