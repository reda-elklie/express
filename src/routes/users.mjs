import { Router } from "express";
import { users } from "../tools/dbUsers.mjs";
import { CreateUserValidationShema } from "../tools/ValidationSchema.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { loggingMiddleware, resoleveUserId } from "../tools/middlwares.mjs";
const router = Router();

router.get("/", (req, res) => {
  res.status(201).send(users);
});

router.post("/api/user", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const addedUser = { id: users[users.length - 1].id + 1, ...body };
  users.push(addedUser);
  res.status(201).send(users);
});
router.post(
  "/api/users",
  checkSchema(CreateUserValidationShema),
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

router.get("/api/users/:id", loggingMiddleware, (req, res) => {
  const parsedId = req.params.id;
  console.log(parsedId);
  const selectedUser = users.find((user) => {
    return user.id == parsedId;
  });
  if (selectedUser) return res.send(selectedUser);
  else return res.sendStatus(404).send({ msg: "user not found !!" });
});

router.put("/api/users/:id", resoleveUserId, (req, res) => {
  const { body, findeUserIndex } = req;
  users[findeUserIndex] = { id: users[findeUserIndex].id, ...body };
  res.sendStatus(201);
});

router.delete("/api/users/:id", resoleveUserId, (req, res) => {
  const { selectedUserIndex } = req;
  users.splice(selectedUserIndex, 1);
  return res.sendStatus(200);
});
export default router;
