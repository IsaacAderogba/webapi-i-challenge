// 1 - Import express, create express server and import db methods
const express = require("express");
const server = express();
const User = require("./data/db");

// 2 - Configure the newly created server to parse JSON
server.use(express.json());

// 3 - Create endpoints
server.get("/api/users", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "The users information could not be retrieved" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: `The user with an ID of ${id} does not exist.` });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved" });
    });
});

server.post("/api/users/", (req, res) => {
  const { name, bio } = req.body;
  if (name && bio) {
    const user = { name, bio };
    User.insert(user)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user" });
  }
});

server.delete("/api/users/:id", (req, res) => {
  res.json("delete user by Id");
});

server.put("/api/users/:id", (req, res) => {
  res.json("put user by Id");
});

// 4 - Tell server to listen for incoming requests
server.listen(3000, () => {
  console.log("listening on 3000");
});
