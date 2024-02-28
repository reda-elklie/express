import cookieParser from "cookie-parser";
import { Router } from "express";
const cookieRouter = Router();
cookieRouter.use(cookieParser("secret")); // Use cookie-parser middleware with the secret

cookieRouter.get("/cookie", (req, res) => {
  res.cookie("testCookie", "reda", { maxAge: 64400000 * 59 * 4, signed: true });
  console.log("cookie");
  res.status(201).send({ msg: "hello I'm cookie" });
});
export default cookieRouter;
