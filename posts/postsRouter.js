const express = require("express");
const Posts = require("./postModel");
const router = express.Router();
const { validatePostId } = require("../middleware/validatePostId");

router.get("/", (req, res) => {
  Posts.get().then((posts) => {
    res.status(201).json(posts);
  });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Posts.getById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  Posts.remove(id)
    .then((removed) => {
      res.status(200).json(`message: you killed ${removed} post mourn it`);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

// function validatePostId(req, res, next) {
//   // do your magic!
// }

module.exports = router;
