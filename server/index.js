import "dotenv/config";
import express from "express";
import router from "./helper/routing/route.js";
import cors from "cors";

import morgan from "morgan";

const app = express();
const port = process.env.port || 7200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.use(cors());
app.use(router);
app.use("/uploads", express.static("images"));
app.listen(port, () => {
  console.log(`server litening on perp ${port}`);
});
