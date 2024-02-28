import { Router } from "express";
import userRouter from "./users.mjs";
import cookieRouter from "./cookie.mjs";
import productRouter from "./products.mjs";
const routers = Router();
routers.use(userRouter);
routers.use(cookieRouter);
routers.use(productRouter);
export default routers;
