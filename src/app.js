import "dotenv/config";
import Express from "express";
import allRouters from "./router/index.js";
import { connectDb } from "./db/config.js";
import syncDb from "./db/init.js";
import main from "./nodemailer.js";
const app = Express();
app.use(Express.json());
app.use(allRouters);
app.listen(3000, console.log("Server Started"));
connectDb();
syncDb();
app.use((err, req, res, next) => {
  console.error("Error:", err); // Log detailed error message
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message }); // Send detailed error message in response
});
// main();
