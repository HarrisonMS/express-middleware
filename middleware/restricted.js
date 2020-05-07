function restricted(req, res, next) {
  const { authorization } = req.headers;
  const API_KEY = process.env.API_KEY;
  if (authorization && authorization === API_KEY) {
    next();
  } else {
    res.status(403).json({
      message:
        "Oh-oh oh oh oh-oh-oh.. U can't touch this Oh-oh oh oh oh-oh-oh.. break it down",
    });
  }
}

module.exports = { restricted: restricted };
