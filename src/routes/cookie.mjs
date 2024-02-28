import { Router } from "express";
const cookieRouter = Router();
cookieRouter.get("/cookie", (req, res) => {
  res.cookie("testCookie", "firstExpressCookie", { maxAge: 60000 * 60 * 2 }); // 1h
  console.log("cookie")
  res.status(201).send({msg : "hello I'm cookie"});
});
export default cookieRouter;
