import { Router } from "express";
import session from "express-session";
const sessionRouter = Router();

sessionRouter.use(
  session({
    secret: "strong secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
sessionRouter.get("/session", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.status(200).send({ msg: "hi im a session " });
});
export default sessionRouter;
