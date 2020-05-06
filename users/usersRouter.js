const express = require("express");
const Users = require("./usersModel");
const router = express.Router();
const { validateUser } = require("../middleware/userPostValidate");

router.post("/", validateUser, (req, res) => {
  const userData = req.body;
  Users.insert(userData)
    .then(({ id }) => {
      console.log(id);
      Users.getById(id)
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  const { id } = req.params;
  Users.getUserPosts(id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
