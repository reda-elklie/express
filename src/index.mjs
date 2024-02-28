import express from "express";
import routers from "./routes/index.mjs";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routers);

app.listen(PORT, () => {
  console.log("server is Good ! running in port : -> " + PORT);
});
