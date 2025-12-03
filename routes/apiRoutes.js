import express from "express";

const adminRouter = express.Router();

adminRouter.get("/profile", (req, res) => {
    res.send("User Profile");
});

adminRouter.get("/products", (req, res) => {
    res.send("User products");
});

export default adminRouter;