const express = require("express");
const Users = require("./usersModel");
const Posts = require("../posts/postModel");
const router = express.Router();
const { validateUser } = require("../middleware/userPostValidate");
const { validateUserId } = require("../middleware/validateUserId");
const { checkRole } = require("../middleware/checkRole");
const { validatePost } = require("../middleware/validatePost");

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

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
  const postData = { user_id: req.params.id, ...req.body };
  Posts.insert(postData)
    .then((post) => {
      console.log(post);
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
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

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.get("/:id/posts", validateUserId, checkRole("user"), (req, res) => {
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

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then((removed) => {
      console.log(removed);
      res
        .status(200)
        .json(`message: you just killed ${removed} user mourn them you animal`);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  Users.update(id, changes)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    });
});

// router.put("/:id", (req, res) => {
//   let { id } = req.params;
//   const changed = req.body;
//   Users.update(id, changed)
//     .then((id) => {
//       Users.getById(id)
//         .then((user) => {
//           res.status(201).json(user);
//         })
//         .catch((error) => {
//           console.log(error.message);
//           res.status(500).json({ errorMessage: error.message });
//         });
//     })
//     .catch((error) => {
//       console.log(error.message);
//       res.status(500).json({ errorMessage: error.message });
//     });
// });

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
