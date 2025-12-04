import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import router from "./routes/index.js";
import webrouter from "./routes/web.js";

import sequelize from "./config/dbconfig.js";
import "./models/index.js";
import { notFound } from "./middleware/404.js";
import { errorHandler } from "./middleware/500.js";

app.set("view engine", "ejs");

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync({ alter: false });
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/api", router);
app.use("/web", webrouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
