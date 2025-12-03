import express from "express";
const webrouter = express.Router();
import { renderHomePage,display,getSingleUser } from "../controllers/web/homeController.js";



webrouter.get("/home", renderHomePage);

webrouter.get("/display", display);

webrouter.get("/user/:id", getSingleUser);

export default webrouter;