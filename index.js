require("dotenv").config();
const bcrypt = require("bcryptjs");
const express = require("express");

const server = express();

server.use(express.json());

const users = [
  { id: 1, username: "Rick", password: 123 },
  { id: 2, username: "Morty", password: 456 },
  { id: 3, username: "Summer", password: 789 },
];

server.get("/", (req, res) => {
  res.send(`<h1>Hello There</h1>`);
});

server.get("/api/users", (req, res) => {
  res.json(users);
});

server.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  const newUser = { username, password: hash };
  users.push(newUser);
  res.json({ users });
});

server.post("/api/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.status(200).json({
      message: `Welcome back ${req.body.username}`,
    });
  }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
