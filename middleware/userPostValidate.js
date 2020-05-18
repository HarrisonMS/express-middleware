// const users = require("../users/usersModel");

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

module.exports = {
  validateUser: validateUser,
};
