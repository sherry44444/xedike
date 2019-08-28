const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, Process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalid" });
    if (decoded) {
      req.user = decoded;
      return next();
    }
  });
};

const authorize = userTypeArr => {
  return (req, res, next) => {
    if (
      userTypeArr.findIndex(userType => userType === req.user.userType) !== -1
    )
      return next();
    res.status(403).json({
      message: "logged in but do not have permission"
    });
  };
};

module.exports = {
  authenticate,
  authorize
};
