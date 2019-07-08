// 1 - Import express, create express server and import db methods
const express = require("express");
const server = express();
const User = require("./data/db");

// 2 - Configure the newly created server to parse JSON and use CORS
server.use(express.json());
server.use(cors());

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

// helper method that is resuable by http requests
const respondWithIdOfUser = (id, req, res, status) => {
  User.findById(id)
    .then(user => {
      if (user) {
        res.status(status).json(user);
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
};

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  respondWithIdOfUser(id, req, res, 200);
});

server.post("/api/users/", (req, res) => {
  const { name, bio } = req.body;
  if (name && bio) {
    const user = { name, bio };
    User.insert(user)
      .then(data => {
        respondWithIdOfUser(data.id, req, res, 201);
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
  const { id } = req.params;
  let userToDelete;

  User.findById(id)
    .then(user => {
      if (user) {
        userToDelete = user;
        User.remove(id)
          .then(user => {
            if (user) {
              res.status(200).json(userToDelete);
            } else {
              res.status(404).json({
                message: `The user with an ID of ${id} does not exist.`
              });
            }
          })
          .catch(() => {
            res
              .status(500)
              .json({ errorMessage: "The user could not be removed" });
          });
      } else {
        res
          .status(404)
          .json({ message: `The user with an ID of ${id} does not exist.` });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { name, bio } = req.body;
  if (name && bio) {
    const { id } = req.params;
    const user = { name, bio };
    User.update(id, user)
      .then(user => {
        if (user) {
          respondWithIdOfUser(id, req, res, 200);
        } else {
          res
            .status(404)
            .json({ message: `The user with the ID of ${id} does not exist` });
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ errorMessage: "The user information could not be modified" });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name and bio for the user" });
  }
});

// 4 - Tell server to listen for incoming requests
server.listen(3000, () => {
  console.log("listening on 3000");
});
