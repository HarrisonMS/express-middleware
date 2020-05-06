const checkRole = (role) => {
  return function (req, res, next) {
    if (role && role === req.headers.role) {
      next();
    } else {
      res
        .status(403)
        .json({
          message:
            "Oh-oh oh oh oh-oh-oh.. U can't touch this Oh-oh oh oh oh-oh-oh.. break it down",
        });
    }
  };
};

module.exports = { checkRole: checkRole };
