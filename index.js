const express = require("express");
const { body, validationResult, matchedData } = require("express-validator");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} -  ${req.url} `);
  next();
};

const resoleveUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  const findeUserIndex = users.findIndex((user) => {
    return user.id == parsedId;
  });
  if (findeUserIndex === -1) return res.sendStatus(404);
  req.findeUserIndex = findeUserIndex;
  next();
};

// you can use the middleware Globalyy or you can use it as a argument in wanted function

// app.use(loggingMiddleware);

app.get("/", (req, res) => {
  //   res.send("hello world !");
  //   res.send({ msg: "hello world " });
  res.status(201).send({ msg: "hello world !" });
});

const users = [
  { id: 1, name: "reda", age: 19, field: "dev" },
  { id: 2, name: "jihad", age: 19, field: "dev" },
  { id: 3, name: "zayd", age: 18, field: "dev" },
];

app.get("/api/users", (req, res) => {
  console.log("reda ");
  res.status(201).send(users);
});

// app.get("/api/users/:id", (req, res) => {
//   const parsedId = parseInt(req.params.id);
//   const selectedUser = users.find((user) => {
//     return user.id === parsedId;
//   });
//   console.log(selectedUser);
//   if (selectedUser) return res.send(selectedUser);
//   return res.status(404).send({ msg: "user not found !!" });
// });

app.post("/api/user", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const addedUser = { id: users[users.length - 1].id + 1, ...body };
  users.push(addedUser);
  res.status(201).send(users);
});

app.post(
  "/api/users",
  body("name")
    .notEmpty()
    .withMessage("name cannot be empty !!")
    .isLength({ min: 3, max: 11 })
    .withMessage("name must be between 3 and 11 caracters")
    .isString()
    .withMessage("name must be a string "),

  (req, res) => {
    const result = validationResult(req);
    console.log(result);

    if (!result.isEmpty())
      return res.status(400).send({ errors: result.array() });
    const data = matchedData(req);

    const addedUser = { id: users[users.length - 1].id + 1, ...data };
    users.push(addedUser);
    res.status(200).send(users);
  }
);

app.get("/api/users/:id", loggingMiddleware, (req, res) => {
  const parsedId = req.params.id;
  console.log(parsedId);
  const selectedUser = users.find((user) => {
    return user.id == parsedId;
  });
  if (selectedUser) return res.send(selectedUser);
  else return res.sendStatus(404).send({ msg: "user not found !!" });
});

app.put("/api/users/:id", resoleveUserId, (req, res) => {
  const { body, findeUserIndex } = req;
  users[findeUserIndex] = { id: users[findeUserIndex].id, ...body };
  res.sendStatus(201);
});

app.delete("/api/users/:id", resoleveUserId, (req, res) => {
  const { selectedUserIndex } = req;
  users.splice(selectedUserIndex, 1);
  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("server is Good ! running in port : -> " + PORT);
});
