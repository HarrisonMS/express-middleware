const Users = require("../users/usersModel");

function validateUserId(req, res, next) {
  const userId = req.params.id || req.body.user_id;
  Users.getById(userId)
    .then((user) => {
      if (user) {
        req.user = user;
        return next();
      } else {
        res.status(400).json({ message: "that is not a valid id" });
      }
    })
    .catch(() => {
      res.status(400).json({ message: "cant fetch user from db" });
    });
}

module.exports = {
  validateUserId: validateUserId,
};
