import { Router } from "express";
import userRouter from "./users.mjs";
import cookieRouter from "./cookie.mjs";
const routers = Router();
routers.use(userRouter);
routers.use(cookieRouter);
export default routers;
