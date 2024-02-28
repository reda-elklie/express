import { users } from "./dbUsers.mjs";

export const resoleveUserId = (req, res, next) => {
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
export const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} -  ${req.url} `);
  next();
};
