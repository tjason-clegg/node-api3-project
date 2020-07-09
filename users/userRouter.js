const express = require("express");

const router = express.Router();
const Users = require("./userDb");
const Posts = require("../posts/postDb");

//// POSTS REQUESTS ////

router.post("/", validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "error creating user" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  const post = req.body;
  post.user_id = req.params.id;
  Posts.insert(post)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem creating post from this user" });
    });
});

//// GET REQUESTS ////

router.get("/", (req, res) => {
  // do your magic!
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "the users information could not be retrieved." });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "error retrieving the user" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then((userPost) => {
      res.status(200).json(userPost);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "problem retrieving posts for this user" });
    });
});

//// DELETE REQUESTS ////

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem removing this user" });
    });
});

//// PUT REQUESTS ////

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem updating user" });
    });
});

//// CUSTOME MIDDLEWARE ////

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id).then((user) => {
    if (user) {
      user = req.user;
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  });
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
