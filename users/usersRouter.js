const express = require("express");
const Users = require("./usersModel");
const router = express.Router();

router.post("/", (req, res) => {
  const userData = req.body;
  Users.insert(userData)
    .then(({ id }) => {
      console.log(id);
      Users.getById(id)
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((error) => {
          res.status.json(error);
        });
    })
    .catch((error) => {
      res.status.json(error);
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
