const Posts = require("../posts/postModel");

function validatePostId(req, res, next) {
  const postId = req.params.id || req.body.user_id;
  Posts.getById(postId)
    .then((post) => {
      if (post) {
        req.post = post;
        return next();
      } else {
        res.status(400).json({ message: "that is not a valid id" });
      }
    })
    .catch(() => {
      res.status(400).json({ message: "cant fetch post from db" });
    });
}

module.exports = {
  validatePostId: validatePostId,
};
