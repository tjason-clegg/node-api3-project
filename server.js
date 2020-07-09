const express = require("express");

const server = express();

const helmet = require("helmet");
const userRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");

//// MIDDLEWARE ////
server.use(express.json());
server.use(helmet());
server.use(logger);

server.use("/api/users", userRouter);
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//// CUSTOME MIDDLEWARE ////
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
}

module.exports = server;
