function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "can not find post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "text required buddy" });
  } else {
    next();
  }
}

module.exports = {
  validatePost: validatePost,
};
