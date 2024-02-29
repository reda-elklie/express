import express from "express";
import routers from "./routes/index.mjs";
import session from "express-session";
import { users } from "./tools/dbUsers.mjs";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routers);
app.use(
  session({
    secret: "reda",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.post("/api/auth", (req, res) => {
  const {
    body: { username, password },
  } = req;

  const findUser = users.find((user) => {
    return user.username === username;
  });

  if (!findUser || findUser.password !== password)
    return res.status(404).send({ msg: "bad credentials !" });

  req.session.user = findUser;
  return res.status(200).send(findUser);
});

app.get("/api/auth/status", (req, res) => {


  req.sessionStore.get(req.sessionID ,(err ,session)=>{
    console.log(session)
  })


  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "unothorized" });
});

app.listen(PORT, () => {
  console.log("server is Good ! running in port : -> " + PORT);
});
