import cookieParser, { signedCookie } from "cookie-parser";
import { Router } from "express";
const productRouter = Router();

productRouter.get("/product", (req, res) => {
//   console.log(req.headers.cookie);
//   console.log(req.cookies.testCookie);
  console.log(req.signedCookies.testCookie); // Corrected this line
  if (req.signedCookies.testCookie === "reda")
    // Corrected this line/*  */
    return res.status(200).send({ name: "product1", qte: 233, price: "33 dh" });
  else
    return res.status(404).send({ msg: "Sorry, you need the right cookie!" });
});

export default productRouter;
